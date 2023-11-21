import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FortyTwoUserDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	// eslint-disable-next-line
	id: number;
}
	