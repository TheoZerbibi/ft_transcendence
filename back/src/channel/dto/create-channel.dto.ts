import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
//import { Exclude } from 'class-transformer';

export class CreateChannelDto {
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
}

export class CreateChannelMessageDto {
	@ApiProperty()
	@IsNumber()
	channel_id: number;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	content: string;
}
