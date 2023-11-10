import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ChannelDto {
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	id: number;

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
	public: boolean;
}

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
	is_ban: boolean;

	@ApiProperty()
	// eslint-disable-next-line
	channel: ChannelDto;
}

export class JoinChannelDto extends ChannelUserDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	// eslint-disable-next-line
	chan_password: string;
}

export class ChannelWithUsersDto extends ChannelDto {
	@ApiProperty()
	@IsArray()
	// eslint-disable-next-line
	users: ChannelUserDto[];
}