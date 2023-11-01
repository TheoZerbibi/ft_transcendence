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
		this.w = 100 / 75;
		this.h = (ratio * 100) / 5;
	}

	move(direction: number) {
		const speed: number = (this.ratio * 100) / 80;

		direction ? (this.y -= speed) : (this.y += speed);
		console.log('before : ', this.y);
		console.log('first : ', (this.ratio * 100) / 150);
		console.log('second : ', this.ratio * 100 - (this.ratio * 100) / 150 - this.h);

		if (this.y < (this.ratio * 100) / 150) this.y = (this.ratio * 100) / 150;
		else if (this.y > this.ratio * 100 - (this.ratio * 100) / 150 - this.h)
			this.y = this.ratio * 100 - (this.ratio * 100) / 150 - this.h;
		console.log('after : ', this.y);
	}
}
