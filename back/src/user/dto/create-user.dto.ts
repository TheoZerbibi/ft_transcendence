import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	// eslint-disable-next-line
	login: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	// eslint-disable-next-line
	display_name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	// eslint-disable-next-line
	avatar: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	// eslint-disable-next-line
	email: string;
}
