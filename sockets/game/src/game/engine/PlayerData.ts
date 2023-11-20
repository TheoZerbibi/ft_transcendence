import { SIDE } from './enums/Side';
import { IPlayerData } from '../impl/interfaces/IPlayerData';
import { Vector } from './utils/Vector';
import { constrain } from './utils/MathUtils';
import { DIRECTION } from './enums/Direction';

export class PlayerData implements IPlayerData {
	private moveSpeed: number = 5;
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

	setMoveSpeed(speed: number): void {
		this.moveSpeed = speed;
	}

	move(direction: DIRECTION) {
		if (direction === DIRECTION.UP) this.pos.y += this.moveSpeed;
		else if (direction === DIRECTION.DOWN) this.pos.y -= this.moveSpeed;
		this.pos.y = constrain(this.pos.y, 0, this.height - this.h);
	}

	addPoint() {
		this.score++;
	}
}
