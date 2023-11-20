<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Req, Res } from '@nestjs/common';
=======
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
>>>>>>> 68333a8 (fix: Fix for rebase)
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { CallbackDto } from './dto/callback.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
=======
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
=======
import { Body, Controller, HttpCode, HttpStatus, Post, Redirect, Get, Req, Res } from '@nestjs/common';
>>>>>>> 2326550 (chore: Update module dependencies)
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
>>>>>>> c80165e (fix: github issue)
=======
import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
>>>>>>> 2433f86 (fix: rework)
=======
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
=======
import { Body, Controller, HttpCode, HttpStatus, Post, Redirect, Get, Req, Res } from '@nestjs/common';
>>>>>>> 76ed767 (feat: sign  with 42 redirection)
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
>>>>>>> 755e714 (fix(back): Revert Auth module)

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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2433f86 (fix: rework)
	/* @Get('auth/oauth/callback') */
	@Get('signup')
	@UseGuards(AuthGuard('jwt'))
	async redirectFromOAuth(@Req() req, @Res() res) {
		const token = await this.authService.signup(req.user);
		res.redirect(`${process.env.API42_REDIRECT_URI}?token=${token}`);
<<<<<<< HEAD
	}
	// @Post('signin')
	// @HttpCode(HttpStatus.OK)
	// @ApiOperation({ summary: 'Log as user.' })
	// async signin(@Body() dto: AuthDto) {
	// 	return this.authService.login(dto);
	// }
=======
=======
	@Get('oauth/callback')
=======
	@Get('/callback:token')
>>>>>>> 7dd47b2 (fix: Fix for rebase)
	async redirectFromOAuth(@Req() req, @Res() res) {
		const code = req.query.code;
		const token = await this.authService.getAccessToken(code);
		const user = await this.authService.getUserInfo(token);
		const jwt = await this.authService.signToken(user);
		res.redirect(`http://localhost:3000/auth/callback?token=${jwt.access_token}`);
	}

>>>>>>> 2326550 (chore: Update module dependencies)
=======
>>>>>>> a0d2e7f (fix: callback controller rework)
=======
	@Get('oauth/callback')
=======
	@Get('/callback:token')
>>>>>>> f54b82a (feat: callback route en cours)
	async redirectFromOAuth(@Req() req, @Res() res) {
		const code = req.query.code;
		const token = await this.authService.getAccessToken(code);
		const user = await this.authService.getUserInfo(token);
		const jwt = await this.authService.signToken(user);
		res.redirect(`http://localhost:3000/auth/callback?token=${jwt.access_token}`);
	}

>>>>>>> 76ed767 (feat: sign  with 42 redirection)
=======
>>>>>>> 8a287e6 (fix: callback controller rework)
	@Post('signin')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Log as user.' })
	async signin(@Body() dto: AuthDto) {
		return this.authService.signin(dto);
	}
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> c80165e (fix: github issue)
=======
	}
	// @Post('signin')
	// @HttpCode(HttpStatus.OK)
	// @ApiOperation({ summary: 'Log as user.' })
	// async signin(@Body() dto: AuthDto) {
	// 	return this.authService.login(dto);
	// }
>>>>>>> 2433f86 (fix: rework)
=======
	@Post('signin')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Log as user.' })
	async signin(@Body() dto: AuthDto) {
		return this.authService.signin(dto);
	}
>>>>>>> 755e714 (fix(back): Revert Auth module)
=======

	@Post('callback')
	@HttpCode(HttpStatus.FOUND)
	@ApiOperation({ summary: 'Callback from 42 API.' })
	async callback(@Body() dto: CallbackDto) {
		return this.authService.callback(dto);
	}
>>>>>>> a0d2e7f (fix: callback controller rework)
=======

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
>>>>>>> 8a287e6 (fix: callback controller rework)
}
