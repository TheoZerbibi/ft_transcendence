import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateChannelDto
{
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	name: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	// eslint-disable-next-line
	password: string;

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	// eslint-disable-next-line
	is_public: boolean;
}

export class CreateChannelUserDto
{
	@ApiProperty()
	@IsNumber()
	user_id: number;

	@ApiProperty()
	@IsNumber()
	channel_id: number;

	@ApiProperty()
	@IsOptional()
	@IsBoolean()
	is_owner: boolean;
}
