import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto, UserDto } from './dto';
import { User, Friends } from '@prisma/client';
import { FriendRequestDto } from './dto/friend.dto';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

enum RequestStatus {
	DECLINED,
	PENDING,
	ACCEPTED,
}

@Injectable()
export class UserService {
	private cloudinary;

	constructor(
		private prisma: PrismaService,
		private config: ConfigService,
	) {}

	private userOnboarding: Array<string> = new Array<string>();

	exclude<User>(user: User, keys: string[]) {
		return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
	}

	/***********************************************************************************/
	/* 										Getters									   */
	/***********************************************************************************/

	/*************************************** Users *************************************/
	async getUserByLogin(userLogin: string): Promise<UserDto | undefined> {
		try {
			const prismaUser: User = await this.prisma.user.findUnique({
				where: {
					login: userLogin,
				},
			});
			if (!prismaUser) return undefined;
			const user = this.exclude(prismaUser, ['dAuth', 'email', 'updated_at']);
			return user as UserDto;
		} catch (e) {
			throw e;
		}
	}

	/************************************* Friends *************************************/
	async getFriendsOfUser(user: User): Promise<UserDto[]> {
		try {
			const friends = await this.prisma.friends.findMany({
				where: {
					OR: [
						{
							user_id: user.id,
						},
						{
							friend_id: user.id,
						},
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
					return this.exclude(f.friend, ['dAuth', 'email', 'updated_at']) as UserDto;
				} else {
					return this.exclude(f.user, ['dAuth', 'email', 'updated_at']) as UserDto;
				}
			});
			return friendsDto;
		} catch (e) {
			throw e;
		}
	}

	async getFriendRequestsOfUser(user: User): Promise<FriendRequestDto[]> {
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
			const friendRequestsDto: FriendRequestDto[] = friendRequests.map((friendRequest) => ({
				author_username: friendRequest.user.login,
				avatar: friendRequest.user.avatar,
			}));
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
				return this.exclude(blockedUser.blocked, ['dAuth', 'email', 'updated_at']) as UserDto;
			});
			return blockedUsersDto;
		} catch (e) {
			throw e;
		}
	}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	/************************************* Friends *************************************/
	async makeFriendRequest(user: User, friendUsername: string): Promise<void> {
		try {
			if (!user) throw new ForbiddenException('User not found');
			const targetUser = await this.util_findUserByName(friendUsername);
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
			const targetUser = await this.util_findUserByName(friendUsername);
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
		try {
			if (dto.display_name) {
				const displayName = await this.checkDisplayName(dto.display_name);
				if (displayName) throw new Error('Display name already taken');
				if (!this.verifyDisplayName(dto.display_name)) throw new Error('Invalid display name');
			}
			const user = await this.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					...dto,
				},
			});
			return user as UserDto;
		} catch (e) {
			throw e;
		}
	}

	async getUser(login: string): Promise<User> {
		try {
			const user: User = await this.prisma.user.findUnique({
				where: {
					login: login,
				},
			});
			return user as User;
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

	async createUser(dto: CreateUserDto): Promise<User> {
		if (!this.userOnboarding.includes(dto.login)) throw new Error('User not onboarding');
		try {
			const displayName = await this.checkDisplayName(dto.display_name);
			if (displayName) throw new Error('Display name already taken');
			if (!this.verifyDisplayName(dto.display_name)) throw new Error('Invalid display name');
			const user = await this.prisma.user.create({
				data: {
					login: dto.login,
					display_name: dto.display_name,
					email: dto.email,
					avatar: dto.avatar,
				},
			});
			this.userOnboarding = this.userOnboarding.filter((login) => login !== dto.login);
			return user;
		} catch (e) {
			throw e;
		}
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

	async getCloudinaryLink(userId: number, file: Express.Multer.File): Promise<any> {
		cloudinary.config({
			cloud_name: this.config.get('CLOUDINARY_CLOUD_NAME'),
			api_key: this.config.get('CLOUDINARY_API_KEY'),
			api_secret: this.config.get('CLOUDINARY_API_SECRET'),
		});
		try {
			const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
			fs.unlinkSync(file.path);
			this.setAvatar(userId, cloudinaryResponse.secure_url);
			return { avatar: cloudinaryResponse.secure_url };
		} catch (e) {
			fs.unlinkSync(file.path);
			throw e;
		}
	}

	/************************************* Friends *************************************/
	async acceptFriendRequest(user: User, friendUsername: string): Promise<void> {
		try {
			if (!user) throw new ForbiddenException('User not found');
			const targetUser = await this.util_findUserByName(friendUsername);
			if (!targetUser) throw new ForbiddenException('User not found');

			/*
 			const blocked = await this.prisma.blocked.findUnique({
				where: {
					blocked_by_id_blocked_id: {
						blocked_by_id: targetUser.id,
						blocked_id: user.id,
					},
				},
			});
			if (blocked) throw new ForbiddenException('You are blocked by this user');
			*/
			const friend = await this.prisma.friends.findUnique({
				where: {
					user_id_friend_id: {
						user_id: targetUser.id,
						friend_id: user.id,
					},
				},
			});
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
	async declineFriendRequest(user: User, friendUsername: string): Promise<void> {
		try {
			if (!user) throw new ForbiddenException('User not found');
			const targetUser = await this.util_findUserByName(friendUsername);
			if (!targetUser) throw new ForbiddenException('User not found');
			if (targetUser === user) throw new BadRequestException('You cannot decline yourself');

			/*
			const blocked = await this.prisma.blocked.findUnique({
				where: {
					blocked_by_id_blocked_id: {
						blocked_by_id: targetUser.id,
						blocked_id: user.id,
					},
				},
			});
			if (blocked) throw new ForbiddenException('You are blocked by this user');
			*/

			const friend = await this.prisma.friends.findUnique({
				where: {
					user_id_friend_id: {
						user_id: targetUser.id,
						friend_id: user.id,
					},
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

	/*********************************** Blocked *************************************/
	async unblockUser(user: User, friendUsername: string): Promise<void> {
		try {
			const targetUser = await this.util_findUserByName(friendUsername);
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
	async util_findUserByName(username: string): Promise<User> {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					login: username,
				},
			});
			if (!user) return null;
			return user;
		} catch (e) {
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

	addUserOnboarding(login: string) {
		this.userOnboarding.push(login);
	}

	verifyDisplayName(displayName: string): boolean {
		const regex = /^[a-zA-Z0-9]+$/;
		if (displayName.length < 3 || displayName.length > 15) return false;
		if (!regex.test(displayName)) return false;
		return true;
	}
}
