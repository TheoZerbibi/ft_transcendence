import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class MessageDto {
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	user_id: number;

	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	channel_id: number;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	content: string;
}
