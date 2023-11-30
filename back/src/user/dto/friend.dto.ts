import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class FriendRequestDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	login: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	avatar: string;
}
