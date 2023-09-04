import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getUserById(userId: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
		return user;
	}
}
