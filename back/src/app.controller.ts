// app.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
	constructor(private authService: AuthService) {}

	/* @Get('auth/oauth/callback') */
	@Get('auth/signup')
	@UseGuards(AuthGuard('jwt'))
	async redirectFromOAuth(@Req() req, @Res() res) {
		const token = await this.authService.login(req.user);
		res.redirect(`${process.env.API42_REDIRECT_URI}?token=${token}`);
	}
}
