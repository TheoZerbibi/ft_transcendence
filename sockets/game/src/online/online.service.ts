import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OnlineService {
	constructor(private prismaService: PrismaService) {}

	async getAllOnlineUsers() {
		try {
			return await this.prismaService.users.findMany({
				where: {
					isOnline: true,
				},
				select: {
					id: true,
					login: true,
					display_name: true,
					avatar: true,
				},
			});
		} catch (e) {
			throw new Error('Error during get all online users');
		}
	}

	async setUserOnline(id: number) {
		try {
			return await this.prismaService.users.update({
				where: {
					id,
				},
				data: {
					isOnline: true,
				},
			});
		} catch (e) {
			throw new Error('Error during set user online');
		}
	}

	async setUserOffline(id: number) {
		try {
			return await this.prismaService.users.update({
				where: {
					id,
				},
				data: {
					isOnline: false,
					last_login: new Date(),
				},
			});
		} catch (e) {
			throw new Error('Error during set user offline');
		}
	}
}
