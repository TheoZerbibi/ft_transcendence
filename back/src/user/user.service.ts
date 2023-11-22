import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto, UserDto } from './dto';
import { User } from '@prisma/client';
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

	async getUser(login: string): Promise<User> {
		const user: User = await this.prisma.user.findUnique({
			where: {
				login: login,
			},
		});
		return user as User;
	}

	async checkDisplayName(displayName: string): Promise<boolean> {
		const user = await this.prisma.user.findUnique({
			where: {
				display_name: displayName,
			},
		});
		return user ? true : false;
	}

	async createUser(dto: CreateUserDto): Promise<User> {
		if (!this.userOnboarding.includes(dto.login)) throw new Error('User not onboarding');
		try {
			const displayName = await this.checkDisplayName(dto.display_name);
			if (displayName) throw new Error('Display name already taken');
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
			console.log(e);
		}
		return null;
	}
}
