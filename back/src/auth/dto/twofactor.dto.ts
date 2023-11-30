import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TwoFactorAuthenticationCodeDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	// eslint-disable-next-line
	secret: string;
}
