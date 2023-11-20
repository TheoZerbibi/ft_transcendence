import { IPlayerData } from './IPlayerData';

export interface IUser {
	user: any;
	socketID: string;
	isConnected: boolean;
	isSpec: boolean;
	playerData: IPlayerData;
}
