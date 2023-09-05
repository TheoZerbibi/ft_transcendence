import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
	@IsString()
	@IsNotEmpty()
	// eslint-disable-next-line
	login: string;
}
