import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class FriendRequestResponseDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	login: string;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	response: boolean;
}
