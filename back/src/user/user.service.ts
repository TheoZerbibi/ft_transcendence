import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto, UserDto } from './dto';
import { User } from '@prisma/client';
import { FriendRequestDto } from './dto/friend.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	private userOnboarding: Array<string> = new Array<string>();

	exclude<User>(user: User, keys: string[]) {
		return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
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

	async deleteUser(userId: number): Promise<void> {
		const user = await this.prisma.user.delete({
			where: {
				id: userId,
			},
		});
	}

	/* 	async getFriends(userLogin: string): Promise<UserDto[]> {
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
	} */
	/* 
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
}
