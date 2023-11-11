import { SIDE } from 'src/game/engine/enums/Side';
import { IGameData } from './IGameData';
import { IUser } from './IUser';

export interface IGame {
	inProgress: boolean;
	newPoint: boolean;
	gameData: IGameData;
	winner: IUser;
	looser: IUser;

	isInProgress: () => boolean;
	isEnded: () => boolean;

	getGameUID: () => string;
	getGameID: () => number;

	getWidth: () => number;
	getHeight: () => number;

	addUser: (user: IUser) => void;
	removeUser: (user: IUser) => void;

	getUser: (userID: number) => IUser | undefined;
	getAllUsersInGame: () => Array<IUser>;
	getUsersInGame: () => Array<IUser>;
	getSpectatorsInGame: () => Array<IUser>;
	getPlayerBySide: (side: SIDE) => IUser;

	userIsInGame: (userId: number) => boolean;
	userIsSpectator: (userId: number) => boolean;

	setPause: (pause: boolean, time: number) => void;
	isInPause: () => boolean;

	addPoint: (side: SIDE) => void;

	startGame: () => void;
	endGame: () => void;
	winGame: (winner: IUser, looser: IUser) => void;

	startGameLoop: () => void;
	getGameData: () => IGameData;
}
