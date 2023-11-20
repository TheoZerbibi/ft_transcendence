import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import {
	IsBoolean,
	IsNumber,
	IsOptional,
	IsString,
	IsDate,
} from 'class-validator';

import { CreateChannelDto } from './create-channel.dto';


export class ChannelDto{
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	id: number;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	name: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	// eslint-disable-next-line
	password: string;


	@ApiProperty()
	@IsDate()
	// eslint-disable-next-line
	created_at: number;

	@ApiProperty()
	@IsDate()
	// eslint-disable-next-line
	updated_at: boolean;
}

export class ChannelUserDto{
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	channel_id: number;

	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	user_id: number;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	name: string;

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
	@IsDate()
	created_at: Date;
}

