import { IsInt, IsString } from 'class-validator';

export class GameJoinDto {
	@IsInt()
	// eslint-disable-next-line
	playerId: number;

	@IsString()
	// eslint-disable-next-line
	socket: string;
}
