import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class GameJoinDto {
	@IsString()
	@IsNotEmpty()
	// eslint-disable-next-line
	gameUID: string;

	@IsNumber()
	@IsNotEmpty()
	// eslint-disable-next-line
	userID: number;

	@IsBoolean()
	@IsNotEmpty()
	// eslint-disable-next-line
	isSpec: boolean;
}
