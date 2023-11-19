import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
//import { Exclude } from 'class-transformer';

export class DirectMessageDto {
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	targetId: number;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	content: string;
}

export class FriendsConvListElemDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	login: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	avatar: string;
}
