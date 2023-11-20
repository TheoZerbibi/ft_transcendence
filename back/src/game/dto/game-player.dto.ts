import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class GamePlayerDto {
	@ApiProperty()
	@IsInt()
	// eslint-disable-next-line
	player_id: number;

	@ApiProperty()
	@IsInt()
	// eslint-disable-next-line
	game_id?: number;

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	// eslint-disable-next-line
	is_win: Boolean;

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	// eslint-disable-next-line
	is_spec: Boolean;
}
