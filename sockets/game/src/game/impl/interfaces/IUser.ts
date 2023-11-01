import { IPlayerData } from './IPlayerData';

export interface IUser {
	user: any;
	socketID: string;
	isSpec: boolean;
	playerData: IPlayerData;
}
