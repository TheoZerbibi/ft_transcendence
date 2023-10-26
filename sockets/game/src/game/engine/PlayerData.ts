import { SIDE } from './enums/Side';
import { IPlayerData } from '../impl/interfaces/IPlayerData';

export class PlayerData implements IPlayerData {
	y: number;
	score: number;
	side: SIDE;

	constructor(ratio: number, side: SIDE) {
		this.y = (ratio * 100) / 2;
		this.score = 0;
		this.side = side;
	}
}
