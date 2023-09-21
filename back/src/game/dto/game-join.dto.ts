import { IsInt } from 'class-validator';

export class GameJoinDto {
	@IsInt()
	// eslint-disable-next-line
	player_id: number;
}
