/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto, UserDto } from './dto';
import { Prisma, User, Friends } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

enum RequestStatus {
	DECLINED,
	PENDING,
	ACCEPTED,
}

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private config: ConfigService,
		private jwt: JwtService,
	) {}

	private static userOnboarding: Array<string> = new Array<string>();

	exclude<User>(user: User, keys: string[]) {
		return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
	}

	/***********************************************************************************/
	/* 										Onboarding								   */
	/***********************************************************************************/

	static addUserOnboarding(login: string) {
		this.userOnboarding.push(login);
	}

	static getUserOnboarding(): Array<string> {
		return this.userOnboarding;
	}

	static isOnBoarding(login: string): boolean {
		return this.userOnboarding.includes(login);
	}

	static removeUserOnboarding(login: string) {
		this.userOnboarding = this.userOnboarding.filter((userLogin) => userLogin !== login);
	}

	async getDisplayName(displayName: string, login: string): Promise<boolean> {
		try {
			if (!this.verifyDisplayName(displayName)) throw new BadRequestException('Invalid display name');
			if (!UserService.isOnBoarding(login)) throw new ForbiddenException('User not onboarding');
			const user = await this.prisma.user.findUnique({
				where: {
					display_name: displayName,
				},
			});
			if (!user) return true;
			return false;
		} catch (e) {
			throw e;
		}
	}

	/***********************************************************************************/
	/* 										Getters									   */
	/***********************************************************************************/

	/*************************************** Users *************************************/
	async getUsers(): Promise<UserDto[]> {
		try {
			const users = await this.prisma.user.findMany();
			const usersDto: UserDto[] = users.map((user) => {
				return this.exclude(user, ['dAuth', 'email', 'updated_at']) as UserDto;
			});
			return usersDto;
		} catch (e) {
			throw e;
		}
	}

	async getNotFriendsOfUser(user: User): Promise<UserDto[]> {
		try {
			const friends = await this.prisma.friends.findMany({
				where: {
					OR: [
						{ user_id: user.id, },
						{ friend_id: user.id, },
					],
				},
			});
			const friendsIds = friends.map((friend) => friend.user_id === user.id ? friend.friend_id : friend.user_id );

			const blocked = await this.prisma.blocked.findMany({
				where: {
					OR: [
						{ blocked_by_id: user.id, },
						{ blocked_id: user.id, },
					],
				},
			});
			const blockedIds = blocked.map((blocked) => blocked.blocked_by_id === user.id ? blocked.blocked_id : blocked.blocked_by_id );

			const users = await this.prisma.user.findMany({
				where: {
					NOT: {
						OR: [
							{ id: user.id, },
							{ id: { in: friendsIds }, },
							{ id: { in: blockedIds }, },
						],
					},
				},
			});
			const usersDto: UserDto[] = users.map((user) => {
				return this.exclude(user, ['dAuth', 'email', 'updated_at']) as UserDto;
			});
			return usersDto;
		} catch (e) {
			throw e;
		}
	}

	async getUsersStartingWith(startingWith: string): Promise<UserDto[]> {
		try {
			const users = await this.prisma.user.findMany({
				where: {
					login: {
						startsWith: startingWith,
					},
				},
			});
			const usersDto: UserDto[] = users.map((user) => {
				return this.exclude(user, ['dAuth', 'email', 'updated_at']) as UserDto;
			});
			return usersDto;
		} catch (e) {
			throw e;
		}
	}

	async getUserByLogin(userLogin: string): Promise<UserDto | undefined> {
		const prismaUser: User = await this.prisma.user.findUnique({
			where: {
				login: userLogin,
			},
		});
		if (!prismaUser) return undefined;
		const user = this.exclude(prismaUser, ['dAuth', 'secret', 'email', 'updated_at']);
		return user as UserDto;
	}

	/************************************* Friends *************************************/
	async getFriendsOfUser(user: User): Promise<UserDto[]> {
		try {
			const friends = await this.prisma.friends.findMany({
				where: {
					OR: [
						{ user_id: user.id, },
						{ friend_id: user.id, },
					],
					status: RequestStatus.ACCEPTED,
				},
				include: {
					user: true,
					friend: true,
				},
			});

			const friendsDto: UserDto[] = friends.map((f) => {
				if (f.user_id === user.id) {
					return this.exclude(f.friend, ['dAuth', 'secret', 'email', 'updated_at']) as UserDto;
				} else {
					return this.exclude(f.user, ['dAuth', 'secret', 'email', 'updated_at']) as UserDto;
				}
			});
			return friendsDto;
		} catch (e) {
			throw e;
		}
	}

	async getFriendRequestsOfUser(user: User): Promise<UserDto[]> {
		try {
			const friendRequests = await this.prisma.friends.findMany({
				where: {
					friend_id: user.id,
					status: RequestStatus.PENDING,
				},
				include: {
					user: true,
				},
			});
			const friendRequestsDto: UserDto[] = friendRequests.map((friendRequest) => {
				return this.exclude(friendRequest.user, ['dAuth', 'email', 'updated_at']) as UserDto;
			});
			return friendRequestsDto;
		} catch (e) {
			throw e;
		}
	}

	/*********************************** Blocked *************************************/
	async getBlockedUsers(user: User): Promise<UserDto[]> {
		try {
			const blockedUsers = await this.prisma.blocked.findMany({
				where: {
					blocked_by_id: user.id,
				},
				include: {
					blocked: true,
				},
			});
			const blockedUsersDto: UserDto[] = blockedUsers.map((blockedUser) => {
				return this.exclude(blockedUser.blocked, ['dAuth', 'secret', 'email', 'updated_at']) as UserDto;
			});
			return blockedUsersDto;
		} catch (e) {
			throw e;
		}
	}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	/*************************************** Users *************************************/
	async createUser(dto: CreateUserDto): Promise<User> {
		try {
			if (!UserService.isOnBoarding(dto.login)) throw new ForbiddenException('User not onboarding');
			const displayName = await this.checkDisplayName(dto.display_name);
			if (displayName) throw new ForbiddenException('Display name already taken');
			if (!this.verifyDisplayName(dto.display_name)) throw new ForbiddenException('Invalid display name');
			const user = await this.prisma.user.create({
				data: {
					login: dto.login,
					display_name: dto.display_name,
					email: dto.email,
					avatar: dto.avatar,
				},
			});
			UserService.removeUserOnboarding(dto.login);
			const token = await this.signToken(user, false);
			return { ...token, ...user };
		} catch (e) {
			throw e;
		}
	}

	/************************************* Friends *************************************/
	async makeFriendRequest(user: User, friendUsername: string): Promise<void> {
		try {
			if (!user) throw new ForbiddenException('User not found');
			const targetUser = await this.findUserByName(friendUsername);
			if (!targetUser) throw new ForbiddenException('User not found');
			if (targetUser === user) throw new BadRequestException('You cannot add yourself as a friend');

			const blocked = await this.prisma.blocked.findUnique({
				where: {
					blocked_by_id_blocked_id: {
						blocked_by_id: targetUser.id,
						blocked_id: user.id,
					},
				},
			});
			if (blocked) throw new ForbiddenException('You are blocked by this user');

			const friend: Friends | null = await this.util_getFriend(user, targetUser);
			if (friend) {
				switch (friend.status) {
				case RequestStatus.PENDING:
					if (friend.user_id === user.id) throw new BadRequestException('Friend request already sent');
					else throw new BadRequestException('You already have a friend request from this user');
				case RequestStatus.ACCEPTED:
					throw new BadRequestException('You are already friend with this user');
				case RequestStatus.DECLINED:
					await this.prisma.friends.update({
						where: {
							user_id_friend_id: {
								user_id: targetUser.id,
								friend_id: user.id,
							},
						},
						data: {
							status: RequestStatus.PENDING,
						},
					});
				}
			} else {
				await this.prisma.friends.create({
					data: {
						user_id: user.id,
						friend_id: targetUser.id,
						status: RequestStatus.PENDING,
					},
				});
			}
		} catch (e) {
			throw e;
		}
	}

	/*********************************** Blocked *************************************/
	async blockUser(user: User, friendUsername: string): Promise<void> {
		try {
			const targetUser = await this.findUserByName(friendUsername);
			if (!targetUser) throw new ForbiddenException('User not found');
			if (targetUser === user) throw new BadRequestException('You cannot block yourself');

			const blocked = await this.prisma.blocked.findUnique({
				where: {
					blocked_by_id_blocked_id: {
						blocked_by_id: user.id,
						blocked_id: targetUser.id,
					},
				},
			});
			if (blocked) throw new BadRequestException("You've already blocked this user");

			await this.prisma.blocked.create({
				data: {
					blocked_by_id: user.id,
					blocked_id: targetUser.id,
				},
			});
			await this.prisma.friends.deleteMany({
				where: {
					OR: [
						{
							user_id: user.id,
							friend_id: targetUser.id,
						},
						{
							user_id: targetUser.id,
							friend_id: user.id,
						},
					],
				},
			});
		} catch (e) {
			throw e;
		}
	}

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/

	/*************************************** Users *************************************/
	async editUser(userId: number, dto: EditUserDto): Promise<UserDto> {
		const user = await this.prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				...dto,
			},
		});
		return user as UserDto;
	}

	async setAvatar(userId: number, avatar: string): Promise<void> {
		try {
			await this.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					avatar: avatar,
				},
			});
		} catch (e) {
			throw e;
		}
	}

	async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
		try {
			// const hashedSecret = await argon2.hash(secret);
			await this.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					secret: secret,
				},
			});
		} catch (e) {
			throw e;
		}
	}

	async turnOnTwoFactorAuthentication(userId: number) {
		try {
			await this.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					dAuth: true,
				},
			});
		} catch (e) {
			throw e;
		}
	}

	async turnOffTwoFactorAuthentication(userId: number) {
		try {
			await this.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					dAuth: false,
					secret: null,
				},
			});
		} catch (e) {
			throw e;
		}
	}

	/************************************* Friends *************************************/
	async respondRequest(user: User, friendUsername: string, response: boolean): Promise<void> {
		try {
			const action: string = response ? 'accept' : 'decline';

			if (!user) throw new ForbiddenException('User not found');
			const targetUser = await this.findUserByName(friendUsername);
			if (!targetUser) throw new ForbiddenException('User not found');
			if (targetUser === user) throw new BadRequestException(`You cannot ${action} yourself`);

 			const blocked = await this.prisma.blocked.findUnique({
				where: {
					blocked_by_id_blocked_id: {
						blocked_by_id: targetUser.id,
						blocked_id: user.id,
					},
				},
			});
			if (blocked) throw new ForbiddenException('You are blocked by this user');

			const friend = await this.prisma.friends.findUnique({
				where: {
					user_id_friend_id: {
						user_id: targetUser.id,
						friend_id: user.id,
					},
				},
			});
			if (!friend) throw new BadRequestException('You did not receive a friend request from this user');

			switch (action) {
			case 'accept':
				await this.acceptFriendRequest(user.id, targetUser.id, friend);
				break;
			case 'decline':
				await this.declineFriendRequest(user.id, targetUser.id, friend);
				break;
			}
		} catch (e) {
			throw e;
		}
	}
	
	async acceptFriendRequest(user_id: number, target_id: number, friend: Friends): Promise<void> {
		try {
			if (friend) {
				switch (friend.status) {
				case RequestStatus.DECLINED:
					throw new BadRequestException('Friend request already declined');
				case RequestStatus.ACCEPTED:
					throw new BadRequestException('You are already friend with this user');
				case RequestStatus.PENDING:
					await this.prisma.friends.update({
						where: {
							user_id_friend_id: {
								user_id: targetUser.id,
								friend_id: user.id,
							},
						},
						data: {
							status: RequestStatus.ACCEPTED,
						},
					});
					break;
				}
			}
		} catch (e) {
			throw e;
		}
	}

	/***********************************************************************************/
	/* 										Deletion								   */
	/***********************************************************************************/

	/*************************************** Users *************************************/
	async deleteUser(userId: number): Promise<void> {
		try {
			const user: User = await this.prisma.user.findUnique({
				where: {
					id: userId,
				},
			});
			if (!user) throw new BadRequestException('User not found');
			await this.prisma.user.delete({
				where: {
					id: userId,
				},
			});
		} catch (e) {
			throw e;
		}
	}

	/************************************* Friends *************************************/
	async removeFriend(user: User, friendUsername: string): Promise<void> {
		try {
			if (!user) throw new ForbiddenException('User not found');
			const targetUser = await this.findUserByName(friendUsername);
			if (!targetUser) throw new ForbiddenException('User not found');
			if (targetUser === user) throw new BadRequestException('You cannot delete yourself');

			await this.prisma.friends.deleteMany({
				where: {
					OR: [
						{
							user_id: user.id,
							friend_id: targetUser.id,
						},
						{
							user_id: targetUser.id,
							friend_id: user.id,
						},
					],
				},
			});
			if (friend) {
				switch (friend.status) {
				case RequestStatus.ACCEPTED:
					throw new BadRequestException(
						"You already accepted this friend request, and can't decline it anymore",
					);
				case RequestStatus.PENDING:
					await this.prisma.friends.delete({
						where: {
							user_id_friend_id: {
								user_id: targetUser.id,
								friend_id: user.id,
							},
						},
					});
					break;
				}
			} else {
				throw new BadRequestException('You did not receive a friend request from this user');
			}
		} catch (e) {
			throw e;
		}
	}

	async checkDisplayName(displayName: string): Promise<boolean> {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					display_name: displayName,
				},
			});
			return user ? true : false;
		} catch (e) {
			throw e;
		}
	}
	/*********************************** Blocked *************************************/
	async unblockUser(user: User, friendUsername: string): Promise<void> {
		try {
			const targetUser = await this.findUserByName(friendUsername);
			if (!targetUser) throw new BadRequestException('User not found');
			if (targetUser === user) throw new BadRequestException('You cannot unblock yourself');

			await this.prisma.blocked.delete({
				where: {
					blocked_by_id_blocked_id: {
						blocked_by_id: user.id,
						blocked_id: targetUser.id,
					},
				},
			});
		} catch (e) {
			if (e instanceof Error && (e.message === 'User not found' || e.message === 'You cannot unblock yourself')) {
				throw e;
			}
			throw new BadRequestException('You did not block this user');
		}
	}

	/***********************************************************************************/
	/* 										Utils									   */
	/***********************************************************************************/

	/*************************************** Users *************************************/
	async findUserByName(user_login: string): Promise<User | null> {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					login: user_login,
				},
			});
			if (!user) return null;
			return user;
		} catch (e) {
			throw e;
		}
	}

	verifyDisplayName(displayName: string): boolean {
		const regex = /^[a-zA-Z0-9]+$/;
		if (displayName.length < 3 || displayName.length > 15) return false;
		if (!regex.test(displayName)) return false;
		return true;
	}

	async signToken(user: Prisma.UserGetPayload<{}>, dAuth: boolean): Promise<{ access_token: string }> {
		const payload = { id: user.id, sub: dAuth };
		const secret = this.config.get<string>('JWT_SECRET');
		const token = await this.jwt.signAsync(payload, { expiresIn: '1d', secret: secret });
		return {
			access_token: token,
		};
	}

	async getCloudinaryLink(login: string, file: Express.Multer.File): Promise<any> {
		cloudinary.config({
			cloud_name: this.config.get('CLOUDINARY_CLOUD_NAME'),
			api_key: this.config.get('CLOUDINARY_API_KEY'),
			api_secret: this.config.get('CLOUDINARY_API_SECRET'),
		});
		try {
			const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
			fs.unlinkSync(file.path);
			return { avatar: cloudinaryResponse.secure_url };
		} catch (e) {
			fs.unlinkSync(file.path);
			throw e;
		}
	}

	/************************************* Friends *************************************/
	async util_getFriend(user: User, target: User): Promise<Friends | null> {
		let friend = await this.prisma.friends.findUnique({
			where: {
				user_id_friend_id: {
					user_id: target.id,
					friend_id: user.id,
				},
			},
		});
		friend = friend
			? friend
			: await this.prisma.friends.findUnique({
					where: {
						user_id_friend_id: {
							user_id: user.id,
							friend_id: target.id,
						},
					},
			  });
		if (!friend) return null;
		return friend;
	}
}
