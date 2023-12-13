import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { toFileStream } from 'qrcode';
import { authenticator } from 'otplib';
import { Response } from 'express';
import { User } from '@prisma/client';
import { UserService } from '../../user/user.service';

@Injectable()
export class TwoFactorAuthenticationService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
	) {}

	public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
		return toFileStream(stream, otpauthUrl);
	}

	public async generateTwoFactorAuthenticationSecret(user: User) {
		const secret = authenticator.generateSecret();

		const otpauthUrl = authenticator.keyuri(user.email, 'Transcendence - MEWO', secret);
		await this.userService.setTwoFactorAuthenticationSecret(secret, user.id);

		return {
			secret,
			otpauthUrl,
		};
	}

	public async isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User) {
		return authenticator.verify({
			token: twoFactorAuthenticationCode,
			secret: user.secret,
		});
	}
}
