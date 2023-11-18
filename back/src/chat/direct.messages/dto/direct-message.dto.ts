import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
//import { Exclude } from 'class-transformer';

export class DirectMessageDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	content: string;
}
