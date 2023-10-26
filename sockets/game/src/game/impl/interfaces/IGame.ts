import { IGameData } from './IGameData';
import { IUser } from './IUser';

export interface IGame {
	inProgress: boolean;
	gameData: IGameData;

	isInProgress: () => boolean;
	isEnded: () => boolean;

	getGameUID: () => string;

	addUser: (user: IUser) => void;
	removeUser: (user: IUser) => void;

	getUser: (userID: number) => IUser | undefined;
	getAllUsersInGame: () => Array<IUser>;
	getUsersInGame: () => Array<IUser>;
	getSpectatorsInGame: () => Array<IUser>;

	userIsInGame: (userId: number) => boolean;
	userIsSpectator: (userId: number) => boolean;

	setPause: (pause: boolean, time: number) => void;
	isIntPause: () => boolean;

	startGame: () => void;
	endGame: () => void;

	startGameLoop: () => void;
	getGameData: () => IGameData;
}
