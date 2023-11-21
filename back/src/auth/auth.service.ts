import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Connection } from './connection/connection.entity';
import { ConnectionService } from './connection/connection.service';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
		// private readonly connectionService: ConnectionService,
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

	async signIn(payload: any): Promise<Connection> {
		console.log(payload);

		if (!payload || payload.id == undefined) {
			return null;
		}

		// // Get existing connection from the provided user42
		// let con = await this.connectionService.get({ user42ID: payload.id }, ['user']);

		// // Create new one if not existant
		// if (!con) {
		// 	const user = await this.userService.create();					// New user
		// 	con = await this.connectionService.create(user, payload.id);	// Make a new connection for this user
		// }

		// // Return Connection
		// return con;
		return null;
	}

	async signToken(user: Prisma.UserGetPayload<{}>): Promise<{ access_token: string }> {
		const payload = { login: user.login, sub: user.id };
		const secret = this.config.get<string>('JWT_SECRET');
		const token = await this.jwt.signAsync(payload, { expiresIn: '1d', secret: secret });
		return {
			access_token: token,
		};
	}

	async getUserInfo(token: string) {
		const response = await fetch('https://api.intra.42.fr/v2/me', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const json = await response.json();
		return json;
	}

	async getUserInfoByLogin(login: string) {
		const response = await fetch(`https://api.intra.42.fr/v2/users/${login}`, {
			headers: {
				Authorization: `Bearer ${this.config.get<string>('API42_TOKEN')}`,
			},
		});
		const json = await response.json();
		return json;
	}

	async callback(dto: { code: string }) {
		try {
			const formData = new FormData();
			formData.append('grant_type', 'authorization_code');
			formData.append('client_id', this.config.get<string>('API42_UID'));
			formData.append('client_secret', this.config.get<string>('API42_SECRET'));
			formData.append('code', dto.code);
			formData.append('redirect_uri', 'http://localhost:3000/auth/callback');

			const access_token: any = await fetch('https://api.intra.42.fr/oauth/token', {
				method: 'POST',
				body: formData,
			});
			const json = await access_token.json();
			this.getUserFromAuthServer(json.access_token);
		} catch (e) {
			throw new ForbiddenException('Invalid request');
		}
	}

	async getUserFromAuthServer(access_token: string) {
		try {
			const userInfo = await this.getUserInfo(access_token);
			console.log(userInfo);
			const user = await this.prisma.user.findUnique({
				where: {
					login: userInfo.login,
				},
			});
			if (!user) {
				const newUser = {
					login: userInfo.login,
					email: userInfo.email,
				};
				return newUser;
			} else {
				return { access_token: this.signToken(user), user: user };
			}
		} catch (e) {
			console.log(e);
			throw new ForbiddenException('Invalid request');
		}
	}
}
