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

	async verifyToken(token: { access_token: string }) {
		console.log(token);
		try {
			this.jwt.verify(token.access_token, { secret: this.config.get<string>('JWT_SECRET') });
		} catch (e) {
			console.log(e);
			throw new ForbiddenException('Invalid token');
		}
	}
}
