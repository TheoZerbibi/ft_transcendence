import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsOptional } from 'class-validator';
import { UUID } from 'crypto';

export class GamePlayerDto {
	@ApiProperty()
	@IsInt()
	// eslint-disable-next-line
	playerId: number;

	@ApiProperty()
	@IsInt()
	// eslint-disable-next-line
	gameId?: number;

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	// eslint-disable-next-line
	isWin:	Boolean;

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	// eslint-disable-next-line
	isSpec: Boolean;
}
