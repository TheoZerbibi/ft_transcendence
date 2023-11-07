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

export class UpdateChannelDto extends PartialType(CreateChannelDto) {
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	id: number;

	@ApiProperty()
	@IsString()
	@IsOptional()
	// eslint-disable-next-line
	name: string;

}

export class UpdateChannelUserDto {
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	user_id: number;

	
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	channel_id: number;

	@ApiProperty()
	@IsOptional()
	@IsBoolean()
	// eslint-disable-next-line
	is_admin: boolean;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	// eslint-disable-next-line
	is_muted: number;

	@ApiProperty()
	@IsOptional()
	@IsBoolean()
	// eslint-disable-next-line
	is_ban: boolean;
}
