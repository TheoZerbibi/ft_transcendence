import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	private static users: Map<number, string> = new Map();

	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
	) {}

	private getUser(token: string) {
		try {
			const userId = this.verifyToken({ access_token: token });

			return this.prisma.users.findUnique({
				where: {
					id: userId,
				},
			});
		} catch (e) {
			console.log(e);
			throw new ForbiddenException('Invalid token');
		}
	}
	private getToken(userId: number) {
		return AuthService.users.get(userId);
	}

	private tokenExists(userId: number) {
		return AuthService.users.has(userId);
	}

	async saveToken(token: { access_token: string }) {
		const decodedToken = this.jwt.decode(token.access_token);
		if (!decodedToken) return;
		console.log(decodedToken);

		const userId = decodedToken['sub'];
		if (this.tokenExists(userId)) {
			const enregistredToken = this.getToken(userId);

			if (enregistredToken === token.access_token) return;
			console.log(`Replace existing JWT Token`);
		}
		AuthService.users.set(userId, token.access_token);
	}

	verifyToken(token: { access_token: string }): number {
		try {
			console.log('JWT Token registred : ', AuthService.users.size);
			const decodedToken = this.jwt.decode(token.access_token);
			if (!decodedToken) throw new ForbiddenException('Invalid token');
			console.log(decodedToken);
			const userId = decodedToken['sub'];
			if (!userId) throw new ForbiddenException('Invalid token');

			this.jwt.verify(token.access_token, { secret: this.config.get('JWT_SECRET') });
			return userId;
		} catch (e) {
			console.log(e);
			throw new ForbiddenException('Invalid token');
		}
	}
}
