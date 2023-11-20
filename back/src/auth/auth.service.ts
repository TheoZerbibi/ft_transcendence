import { ForbiddenException, Injectable } from '@nestjs/common';
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

<<<<<<< HEAD
=======
	async getAccessToken(code: string) {
		const data = {
			grant_type: 'authorization_code',
			client_id: this.config.get<string>('API42_UID'),
			client_secret: this.config.get<string>('API42_SECRET'),
			code: code,
			redirect_uri: 'http://localhost:3001/auth/callback',
		};
		const response = await fetch('https://api.intra.42.fr/oauth/token', {
			method: 'POST',
			body: new URLSearchParams(data),
		});
		const json = await response.json();
		return json.access_token;
	}

>>>>>>> f54b82a (feat: callback route en cours)
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
<<<<<<< HEAD

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
=======
>>>>>>> f54b82a (feat: callback route en cours)
}
