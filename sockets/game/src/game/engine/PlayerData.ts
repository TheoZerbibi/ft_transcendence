import { SIDE } from './enums/Side';
import { IPlayerData } from '../impl/interfaces/IPlayerData';
import { IVector } from './interfaces/IVector';

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
		this.w = 100 / 70;
		this.h = (ratio * 100) / 5;
	}

	move(direction: number) {
		const speed: number = (this.ratio * 100) / 100;

		direction ? (this.y -= speed) : (this.y += speed);

		if (this.y < (this.ratio * 100) / 100) {
			// this.y = (this.ratio * 100) / 100;
			this.y++;
		} else if (this.y > this.ratio * 100 - (this.ratio * 100) / 100 - this.h) {
			console.log(--this.y);
			this.y--;
			// this.y = this.ratio * 100 - (this.ratio * 100) / 150 - this.h;
		}
	}
}
