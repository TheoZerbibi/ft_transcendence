import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsOptional, IsUUID } from 'class-validator';

export class GameDto {
	@ApiProperty()
	@IsInt()
	// eslint-disable-next-line
	id: number;

	@ApiProperty()
	@IsUUID()
	// eslint-disable-next-line
	uid: String;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	is_private: boolean;

	@ApiProperty()
	@IsDate()
	// eslint-disable-next-line
	created_at: Date;

	@ApiProperty()
	@IsDate()
	@IsOptional()
	// eslint-disable-next-line
	started_at: Date;

	@ApiProperty()
	@IsDate()
	@IsOptional()
	// eslint-disable-next-line
	end_at: Date;
}
