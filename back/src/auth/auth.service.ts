/* import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
	) {}

	async signup(dto: AuthDto) {
		try {
			const user = await this.prisma.user.create({
				data: {
					login: dto.login,
					display_name: dto.login,
					email: `${dto.login}@student.42.fr`,
					avatar: `https://cdn.intra.42.fr/users/${dto.login}.jpg`,
				},
			});
			return this.signToken(user);
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new ForbiddenException('Credentials taken');
			}
			throw e;
		}
	}

	async signin(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				login: dto.login,
			},
		});
		if (!user) throw new ForbiddenException('Invalid credentials');
		return this.signToken(user);
	}

	async signToken(user: Prisma.UserGetPayload<{}>): Promise<{ access_token: string }> {
		const payload = { login: user.login, sub: user.id };
		const secret = this.config.get<string>('JWT_SECRET');
		const token = await this.jwt.signAsync(payload, { expiresIn: '1d', secret: secret });
		return {
			access_token: token,
		};
	}
}
 */

// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async login(user: any): Promise<string> {
		const payload = { username: user.username, sub: user.userId };
		return this.jwtService.sign(payload);
	}
}
