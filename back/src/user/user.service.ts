import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto, UserDto } from './dto';
import { User } from '@prisma/client';
import { FriendRequestDto } from './dto/friend.dto';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	exclude<User>(user: User, keys: string[]) {
		return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
	}

	async getUserByLogin(userLogin: string): Promise<UserDto | undefined> {
		const prismaUser: User = await this.prisma.user.findUnique({
			where: {
				login: userLogin,
			},
		});
		if (!prismaUser) return undefined;
		const user = this.exclude(prismaUser, ['dAuth', 'email', 'updated_at']);
		return user as UserDto;
	}

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

	async deleteUser(userId: number): Promise<void> {
		const user = await this.prisma.user.delete({
			where: {
				id: userId,
			},
		});
	}

	async findUserByName(username: string): Promise<User | null> {
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

	async addFriend(username: string, friendUsername: string): Promise<void> {
		try {
			const targetUser = await this.findUserByName(friendUsername);
			if (!targetUser) throw new ForbiddenException('User not found');

			const user = await this.prisma.user.findUnique({
				where: {
					login: username,
				},
				include: {
					friends: true,
				},
			});
			if (!user) throw new ForbiddenException('User not found');

			const friend = user.friends.find((friend) => friend.friend_id === targetUser.id);
			if (friend) {
				throw new BadRequestException('You are already friend with this user');
			}

			const blocked = await this.prisma.blocked.findUnique({
				where: {
					blocked_by_id_blocked_id: {
						blocked_by_id: targetUser.id,
						blocked_id: user.id,
					},
				},
			});
			if (blocked) throw new ForbiddenException('You are blocked by this user');

			await this.prisma.friends.create({
				data: {
					user_id: user.id,
					friend_id: targetUser.id,
				},
			});
		} catch (e) {
			throw e;
		}
	}

	/*
 	async getFriends(userLogin: string): Promise<UserDto[]> {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					login: userLogin,
				},
			});
			const friends = await this.prisma.friends.findMany({
				where: {
					OR : [
						{
							user_id: user.id,
						},
						{
							friend_id: user.id,
						},
					],
				}
			});
			const friendsDto: UserDto[] = friends.map((friend) => {
				if (friend.user_id == user.id) {
					return this.exclude(friend.friend, ['dAuth', 'email', 'updated_at']) as UserDto;
				} else {
					return this.exclude(friend.user, ['dAuth', 'email', 'updated_at']) as UserDto;
				}
			});
			return friendsDto;
		} catch (e) {
			throw e;
		}
	}

	async addFriend(userLogin: string, friendLogin: string): Promise<void> {
		const user = await this.prisma.user.findUnique({
			where: {
				login: userLogin,
			},
		});

		const targetUser = await this.prisma.user.findUnique({
			where: {
				login: userLogin,
			},
		});
		if (!targetUser) throw new ForbiddenException('User not found');

		const blocked = await this.prisma.blocked.findMany({
			where: {
				blocked_by_id: user.id,
				blocked_id: targetUser.id,
			},
		});
		if (blocked) throw new ForbiddenException('You are blocked by this user');

		const friends = await this.prisma.friends.findMany({
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
		if (friends) throw new ForbiddenException('You are already friend with this user');

		await this.prisma.friends.create({
			data: {
				user_id: user.id,
				friend_id: targetUser.id,
			},
		});
	}

	async utilGetUser(login: string): Promise<User> {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					login: login,
				},
			});
			if (!user) return null;
			return user;
		} catch (e) {
			throw e;
		}
	}
	*/
}
