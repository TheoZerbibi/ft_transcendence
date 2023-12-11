import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UserDto {
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	id: number;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	login: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	display_name: string;

	@ApiProperty()
	@IsString()
	@Exclude()
	// eslint-disable-next-line
	email: string;

	@ApiProperty()
	@IsBoolean()
	@Exclude()
	// eslint-disable-next-line
	dAuth: boolean;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	avatar: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	@Exclude()
	// eslint-disable-next-line
	secret: string;

	@ApiProperty()
	@IsDate()
	// eslint-disable-next-line
	created_at: Date;

	@ApiProperty()
	@IsDate()
	@Exclude()
	// eslint-disable-next-line
	updated_at: Date;

	@ApiProperty()
	@IsDate()
	// eslint-disable-next-line
	last_login: Date;
}

export class UserLoginDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	login: string;
}
