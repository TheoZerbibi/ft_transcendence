import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsOptional, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class GameDto {
	@ApiProperty()
	@IsInt()
	// eslint-disable-next-line
	id: number;

	@ApiProperty()
	@IsUUID()
	// eslint-disable-next-line
	avatar?: UUID;

	@ApiProperty()
	@IsDate()
	// eslint-disable-next-line
	createdAt: Date;

	@ApiProperty()
	@IsDate()
	@IsOptional()
	// eslint-disable-next-line
	startedAt: Date;

	@ApiProperty()
	@IsDate()
	@IsOptional()
	// eslint-disable-next-line
	endAt: Date;
}
