import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class ChannelUserDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	username: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	avatar: string;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	is_owner: boolean;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	is_admin: boolean;

	@ApiProperty()
	@IsDate()
	// eslint-disable-next-line
	is_muted: Date;

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
