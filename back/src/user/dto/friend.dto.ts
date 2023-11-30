import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class FriendRequestDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	author_username: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	avatar: string;
}
