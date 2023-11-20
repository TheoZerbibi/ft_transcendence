import { SIDE } from './enums/Side';
import { IPlayerData } from '../impl/interfaces/IPlayerData';
import { Vector } from './utils/Vector';
import { constrain } from './utils/MathUtils';
import { DIRECTION } from './enums/Direction';

export class PlayerData implements IPlayerData {
	pos: Vector;
	w: number;
	h: number;
	side: SIDE;
	score: number;

	constructor(
		private width: number,
		private height: number,
		x: number,
		y: number,
		w: number,
		h: number,
		side: SIDE,
	) {
		this.pos = new Vector(x, y);
		this.score = 0;
		this.side = side;
		this.w = w;
		this.h = h;
	}

	move(direction: DIRECTION) {
		if (direction === DIRECTION.UP) this.pos.y += 5;
		else if (direction === DIRECTION.DOWN) this.pos.y -= 5;
		this.pos.y = constrain(this.pos.y, 0, this.height - this.h);
	}

	addPoint() {
		this.score++;
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
