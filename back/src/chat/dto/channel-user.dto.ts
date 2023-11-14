import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ChannelUserDto {
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	id: number;

	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	channel_id: number;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	user_id: string;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	is_owner: boolean;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	is_admin: boolean;

	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	is_muted: number;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	is_banned: boolean;
}

export class CreateChannelUserDto {
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	user_id: number;

	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	channel_id: number;

	@ApiProperty()
	@IsOptional()
	@IsBoolean()
	// eslint-disable-next-line
	is_owner: boolean;

	@ApiProperty()
	@IsString()
	@IsOptional()
	// eslint-disable-next-line
	chan_password: string;
}
