import { SIDE } from './enums/Side';
import { IPlayerData } from '../impl/interfaces/IPlayerData';
import { Vector } from './utils/Vector';

export class PlayerData implements IPlayerData {
	private width: number = 700;
	private height: number = 400;

	pos: Vector;
	w: number;
	h: number;
	side: SIDE;
	score: number;

	constructor(x: number, y: number, h: number, w: number, side: SIDE) {
		this.pos = new Vector(x, y);
		this.score = 0;
		this.side = side;
		this.w = w;
		this.h = h;
	}

	move(direction: number) {
		if (direction === 1) {
			if (this.pos.y > 0 && this.pos.y + this.h < this.height) this.pos.y -= 5;
		} else if (direction === 0) {
			if (this.pos.y + this.h < this.height) this.pos.y += 5;
		}
	}
}
