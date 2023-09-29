import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly authService: AuthService,
		private readonly config: ConfigService,
	) {
		super();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		console.log('JwtGuard canActivate');
		const client = context.switchToWs().getClient();
		const authorizationHeader = client.handshake.headers.authorization;

		if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
			return false;
		}
		console.log('authorizationHeader : ', authorizationHeader);
		const token = authorizationHeader.split(' ')[1];

		try {
			// console.log('decodedToken : ', decodedToken);
			console.log('authService : ', this.authService);
			console.log('jwtService : ', this.jwtService);
			console.log('config : ', this.config);
			this.jwtService.verify(token.access_token, { secret: this.config.get('JWT_SECRET') });
			// const decodedToken = this.jwtService.verify(token);
			// const user = await this.authService.findUserById(decodedToken.userId);

			// if (!user) {
			// 	return false;
			// }

			// context.switchToWs().getData().user = user;

			return true;
		} catch (error) {
			return false;
		}
	}
}
