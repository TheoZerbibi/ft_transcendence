import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { users } from '@prisma/client';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
	) {}
	public async getUser(token: string): Promise<users | undefined> {
		try {
			const userId = this.verifyToken({ access_token: token });

			const user = await this.prisma.users.findUnique({
				where: {
					id: userId,
				},
			});
			return user as users;
		} catch (e) {
			console.log(e);
			throw new ForbiddenException('Invalid token');
		}
	}

	verifyToken(token: { access_token: string }): number {
		try {
			this.jwt.verify(token.access_token, { secret: this.config.get('JWT_SECRET') });

			const decodedToken = this.jwt.decode(token.access_token);
			if (!decodedToken) throw new ForbiddenException('Invalid token');
			const userId = decodedToken['id'];
			if (!userId) throw new ForbiddenException('Invalid token');

			return userId;
		} catch (e) {
			throw new ForbiddenException('Invalid token');
		}
	}
}
