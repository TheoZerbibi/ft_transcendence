import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CallbackDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	// eslint-disable-next-line
	code: string;
}
