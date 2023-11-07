import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	//IsDate,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';
//import { Exclude } from 'class-transformer';

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
	is_public: boolean;
}

export class ChannelUserDto {
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
}

export class joinChannelDto extends ChannelUserDto {
	@ApiProperty()
	@IsString()
	@IsOptionnal()
	chan_password: string;
}

export class messageDto{

	@ApiProperty()
	@IsString()
	content: string;

	@ApiProperty()
	@IsNumber()
	channel_user_id: number;
}
