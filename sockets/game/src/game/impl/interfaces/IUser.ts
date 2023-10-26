import { PlayerData } from '../../engine/PlayerData';

export interface IUser {
	user: any;
	socketID: string;
	isSpec: boolean;
	playerData: PlayerData;
}
