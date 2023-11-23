import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class FriendRequestDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	user_name: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	avatar: string;

	@ApiProperty()
	@IsDate()
	// eslint-disable-next-line
	created_at: Date;
}