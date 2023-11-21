import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy) {
	constructor(config: ConfigService) {
		super({
			clientID: config.get('API42_UID'),
			clientSecret: config.get('API42_SECRET'),
			callbackURL: config.get('API42_CALLBACK'),
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
		return done(null, profile);
	}
}
