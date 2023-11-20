import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { AuthService } from '../auth.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			clientID: process.env.API42_UID,
			clientSecret: process.env.API42_SECRET,
			callbackURL: process.env.API42_CALLBACK,
		});
	}
	
	// async validate(
	// 	accessToken: string,
	// 	refreshToken: string,
	// }
}
