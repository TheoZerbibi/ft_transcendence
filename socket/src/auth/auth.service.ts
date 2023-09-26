import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
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

	verifyToken(token: { access_token: string }): number {
		try {
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
