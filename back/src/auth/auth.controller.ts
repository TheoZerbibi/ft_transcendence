import { Body, Controller, HttpCode, HttpStatus, Post, Redirect, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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

	@Post('signin')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Log as user.' })
	async signin(@Body() dto: AuthDto) {
		return this.authService.signin(dto);
	}

	@Post('callback:token')
	@HttpCode(HttpStatus.FOUND)
	@ApiOperation({ summary: 'Callback from 42 API.' })
	async checkStateAndStoreJWT(@Req() req, @Res() res) {
		const code = req.query.code;
		const token = await this.authService.getAccessToken(code);
		const user = await this.authService.getUserInfo(token);
		const jwt = await this.authService.signToken(user);
		res.cookie('jwt', jwt.access_token, { httpOnly: true });
		res.redirect('http://localhost:3000');
	}
}
