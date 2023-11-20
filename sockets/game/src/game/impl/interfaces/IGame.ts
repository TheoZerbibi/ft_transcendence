import { SIDE } from 'src/game/engine/enums/Side';
import { IGameData } from './IGameData';
import { IUser } from './IUser';

export interface IGame {
	inProgress: boolean;
	newPoint: boolean;
	gameData: IGameData;
	winner: IUser;
<<<<<<< HEAD
	loser: IUser;

	removeGame: () => void;
=======
	looser: IUser;
>>>>>>> 7cff344 (refactor(pong): Fix EndGame condition (Crash when player refresh))

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
<<<<<<< HEAD
	winGame: (winner: IUser, loser: IUser) => void;
=======
	winGame: (winner: IUser, looser: IUser) => void;
>>>>>>> 7cff344 (refactor(pong): Fix EndGame condition (Crash when player refresh))

	startGameLoop: () => void;
	getGameData: () => IGameData;
}
