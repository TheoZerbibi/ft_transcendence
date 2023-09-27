import { users } from "@prisma/client"
import { IUser } from "./IUser";

export interface IGame {
	inProgress: boolean;

	isInProgress: () => boolean;
	getGameUID: () => string;
	addUser: (user: IUser) => void;
	getAllUserInGame: () => Array<IUser>;
	getUserInGame: () => Array<IUser>;
	getSpectatorInGame: () => Array<IUser>;
	userIsInGame: (userId: number) => boolean;
	startGame: () => void;
}
