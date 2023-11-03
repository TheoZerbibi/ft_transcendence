import { SIDE } from './enums/Side';
import { IPlayerData } from '../impl/interfaces/IPlayerData';
import { IVector } from './interfaces/IVector';

export class PlayerData implements IPlayerData {
	private width: number = 4700;
	private height: number = 4400;

	pos: IVector;
	w: number;
	h: number;
	side: SIDE;
	score: number;

	constructor(x: number, y: number, h: number, w: number, side: SIDE) {
		this.pos = { x: x, y: y };
		this.score = 0;
		this.side = side;
		this.w = w;
		this.h = h;
	}

	move(direction: number) {
		if (direction === 1) {
			if (this.pos.y > 0) this.pos.y -= 10;
		} else if (direction === 2) {
			if (this.pos.y + this.h < this.height) this.pos.y += 10;
		}
	}
}
