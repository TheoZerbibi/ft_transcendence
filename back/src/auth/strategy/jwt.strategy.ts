import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		config: ConfigService,
		private prisma: PrismaService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get('JWT_SECRET'),
		});
	}

	async validate(payload: { id: number; sub: boolean }) {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					id: payload.id,
				},
			});
			if (!user) throw new Error('User not found');
			if (!user.dAuth) return user;
			if (user.dAuth && payload.sub) return user;
		} catch (error) {
			throw new ForbiddenException('User not found');
		}
	}
}
