import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy) {
	constructor(config: ConfigService, private readonly authService: AuthService) {
		super({
			clientID: config.get('API42_UID'),
			clientSecret: config.get('API42_SECRET'),
			callbackURL: 'http://made-f0Cr2s5.clusters.42paris.fr:3000/auth/42/callback'
		});
	}

	validate(accessToken: string, refreshToken: string, profile: any): any {
		console.log('HELLO');
		return profile;
	}
}
