import {
	ClassSerializerInterceptor,
	Controller,
	Post,
	UseInterceptors,
	Res,
	UseGuards,
	HttpCode,
	UnauthorizedException,
	Body,
	Req,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { TwoFactorAuthenticationService } from '../services/twofactor.service';
import { TwoFactorAuthenticationCodeDto } from '../dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../services/auth.service';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('2FA')
export class TwoFactorAuthenticationController {
	constructor(
		private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
		private readonly userService: UserService,
		private readonly authService: AuthService,
	) {}

	@Post('generate')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Generate 2FA QR code' })
	@ApiBearerAuth('JWT-auth')
	async register(@GetUser() user, @Res() response: Response) {
		const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(user);

		return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
	}

	@Post('turn-on')
	@HttpCode(200)
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Turn on 2FA' })
	@ApiBearerAuth('JWT-auth')
	async turnOnTwoFactorAuthentication(@GetUser() user, @Body() body: TwoFactorAuthenticationCodeDto) {
		const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(body.secret, user);
		if (!isCodeValid) {
			throw new UnauthorizedException('Wrong authentication code');
		}
		await this.userService.turnOnTwoFactorAuthentication(user.id);
	}

	@Post('authenticate')
	@HttpCode(200)
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Authentificate with 2FA' })
	@ApiBearerAuth('JWT-auth')
	async authenticate(
		@Req() req: any,
		@Res() res: Response,
		@GetUser() user,
		@Body() body: TwoFactorAuthenticationCodeDto,
	) {
		const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(body.secret, user);
		if (!isCodeValid) {
			throw new UnauthorizedException('Wrong authentication code');
		}
		const url = new URL(`${req.protocol}:${req.hostname}`);
		url.port = process.env.FRONT_PORT;
		const _user: any = await this.authService.authUser(user, true);
		if (_user.access_token) {
			res.cookie('token', _user.access_token, {
				httpOnly: false,
				expires: new Date(Date.now() + 1000 * 60),
			});
			res.redirect(url.href);
			return user;
		}
	}
}
