import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
//import { Exclude } from 'class-transformer';

export class DirectMessageDto {
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	user_id: number;

	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	friend_id: number;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	content: string;

	@ApiProperty()
	@IsDate()
	// eslint-disable-next-line
	created_at: Date;
}

export class CreateDirectMessageDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	target_name: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	content: string;
}