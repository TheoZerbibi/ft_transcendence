import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
		private readonly userService: UserService,
	) {}

	validateJwt(token: string): any {
		try {
			const decodedToken = this.jwt.verify(token, this.config.get('JWT_SECRET'));
			return decodedToken;
		} catch (error) {
			throw new UnauthorizedException('Invalid token');
		}
	}

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

	async authUser(user: any) {
		try {
			const userPrisma: User = await this.userService.getUser(user.login);
			if (!userPrisma) {
				const newUser = {
					login: user.login,
					email: user.email,
					avatar: user.image.link,
				};
				this.userService.addUserOnboarding(newUser.login);
				return newUser;
			} else {
				const token = await this.signToken(userPrisma);
				return { ...token, ...userPrisma };
			}
		} catch (e) {
			console.log(e);
			throw new ForbiddenException('Invalid request');
		}
	}
}
