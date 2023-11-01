import { SIDE } from './enums/Side';
import { IPlayerData } from '../impl/interfaces/IPlayerData';

export class PlayerData implements IPlayerData {
	y: number;
	score: number;
	side: SIDE;
	w: number;
	h: number;

	constructor(
		private ratio: number,
		side: SIDE,
	) {
		this.y = (ratio * 100) / 2;
		this.score = 0;
		this.side = side;
		this.w = 100 / 75;
		this.h = (ratio * 100) / 5;
	}

	// move(position: IVector) {
	// 	const speed: number = (this.ratio * 100) / 80;
	// }
}
