import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditUserDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	// eslint-disable-next-line
	displayName?: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	// eslint-disable-next-line
	avatar?: string;
}
