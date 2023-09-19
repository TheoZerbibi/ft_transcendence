import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
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
	@IsOptional()
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
	@IsDate()
	// eslint-disable-next-line
	createdAt: Date;

	@ApiProperty()
	@IsDate()
	@Exclude()
	// eslint-disable-next-line
	updatedAt: Date;

	@ApiProperty()
	@IsDate()
	// eslint-disable-next-line
	lastLogin: Date;
}
