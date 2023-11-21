import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FortyTwoGuard } from './guard';
import { Public } from './decorator/public.decorator';
import { Connection } from './connection/connection.entity';

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

	@Public()
	@UseGuards(FortyTwoGuard)
	@Get('42/callback')
	@ApiOperation({ summary: 'Callback from 42 API.' })
	async callback(@Req() req: any, @Res() res: Response) {
		// const conn: Connection = await this.authService.signIn(req.user);
		// console.log('c', conn);
		// return this.authService.callback(dto);

		// if (!conn) {
		// 	console.log('Bad payload, unauthorized user!');
		// 	res.status(HttpStatus.FORBIDDEN).send();
		// 	req.redirect(`http://made-f0Cr2s5.clusters.42paris.fr:3000/`);
		// 	return ;
		// }
	}
}
