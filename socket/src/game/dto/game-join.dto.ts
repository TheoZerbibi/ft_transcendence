import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class GameJoinDto {
	@IsString()
	@IsNotEmpty()
	// eslint-disable-next-line
	uid: string;

	@IsNumber()
	@IsNotEmpty()
	// eslint-disable-next-line
	userID: string;
}
