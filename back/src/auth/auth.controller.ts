import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Create a new user.' })
	async signup(@Body() dto: AuthDto) {
		return this.authService.signup(dto);
	}

	/* @Get('auth/oauth/callback') */
	@Get('signup')
	@UseGuards(AuthGuard('jwt'))
	async redirectFromOAuth(@Req() req, @Res() res) {
		const token = await this.authService.signup(req.user);
		res.redirect(`${process.env.API42_REDIRECT_URI}?token=${token}`);
	}
	// @Post('signin')
	// @HttpCode(HttpStatus.OK)
	// @ApiOperation({ summary: 'Log as user.' })
	// async signin(@Body() dto: AuthDto) {
	// 	return this.authService.login(dto);
	// }
}
