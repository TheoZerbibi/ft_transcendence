import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
//import { Exclude } from 'class-transformer';

export class ChannelMessageContentDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	content: string;
}

export class ChannelMessageDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	username: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	avatar: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	created_at: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	content: string;
}
