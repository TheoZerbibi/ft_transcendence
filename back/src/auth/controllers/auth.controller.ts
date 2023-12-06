import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FortyTwoGuard } from '../guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(FortyTwoGuard)
	@Get('42/callback')
	@ApiOperation({ summary: 'Callback from 42 API.' })
	async callback(@Req() req: any, @Res() res: Response) {
		const url = new URL(`${req.protocol}:${req.hostname}`);
		url.port = process.env.FRONT_PORT;
		const user: any = await this.authService.authUser(req.user._json);
		if (user.access_token) {
			if (user.dAuth) {
				url.pathname = '/login';
				res.status(200).cookie('2FA', user.access_token, { httpOnly: false });
				res.redirect(url.href);
			} else {
				res.cookie('token', user.access_token, {
					httpOnly: false,
					expires: new Date(Date.now() + 1000 * 60),
				});
				res.redirect(url.href);
			}
		} else {
			url.pathname = '/login';
			res.status(200).cookie('userOnboarding', JSON.stringify({ ...user }), { httpOnly: false, encode: String });
			res.redirect(url.href);
		}
		return user;
	}
}