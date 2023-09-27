import { IUser } from './IUser';

export interface IGame {
	inProgress: boolean;
	isEnd: boolean;

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

	startGame: () => void;
	endGame: () => void;
}
