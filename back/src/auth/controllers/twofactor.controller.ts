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
	Get,
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

	@Get('generate')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Generate 2FA QR code' })
	@ApiBearerAuth('JWT-auth')
	async register(@GetUser() user, @Res() response: Response) {
		try {
			if (user.dAuth) {
				throw new UnauthorizedException('2FA already enabled');
			}
		} catch (e) {}
		const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(user);

		return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
	}

	@Post('turn-on')
	@HttpCode(200)
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Turn on 2FA' })
	@ApiBearerAuth('JWT-auth')
	async turnOnTwoFactorAuthentication(@GetUser() user, @Body() body: TwoFactorAuthenticationCodeDto) {
		try {
			if (user.dAuth) {
				throw new UnauthorizedException('2FA already enabled');
			}
		} catch (e) {}
		const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(body.code, user);
		if (!isCodeValid) {
			throw new UnauthorizedException('Wrong authentication code');
		}
		const token = await this.userService.turnOnTwoFactorAuthentication(user.id);
		return { message: 'Two factor authentication enabled', ...token };
	}

	@Post('turn-off')
	@HttpCode(200)
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Turn off 2FA' })
	@ApiBearerAuth('JWT-auth')
	async turnOffTwoFactorAuthentication(@GetUser() user, @Body() body: TwoFactorAuthenticationCodeDto) {
		const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(body.code, user);
		if (!isCodeValid) {
			throw new UnauthorizedException('Wrong authentication code');
		}
		const token = await this.userService.turnOffTwoFactorAuthentication(user.id);
		return { message: 'Two factor authentication disabled', ...token };
	}

	@Post('authenticate')
	@HttpCode(200)
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Authentificate with 2FA' })
	@ApiBearerAuth('JWT-auth')
	async authenticate(@GetUser() user, @Body() body: TwoFactorAuthenticationCodeDto) {
		const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(body.code, user);
		if (!isCodeValid) {
			throw new UnauthorizedException('Wrong authentication code');
		}
		const token: any = await this.authService.signToken(user, true);
		if (token.access_token) {
			return token;
		}
		return { message: 'Two factor authentication error' };
	}
}
