// import P5 from 'p5';
import { IPlayerData } from '../impl/interfaces/IPlayerData';
import { Vector } from './utils/Vector';
import { SIDE } from './enums/Side';
import { IVector } from './interfaces/IVector';
import { constrain } from './utils/MathUtils';

export class Ball {
	private width: number = 700;
	private height: number = 400;
	private r: number = 10;
	private speed: number = 1;
	private spawn: Vector;
	private pos: Vector;
	private vel: Vector;

	private rightUser: IPlayerData;
	private leftUser: IPlayerData;
	playerLHasHit: boolean = false;
	playerRHasHit: boolean = false;

	constructor() {
		this.spawn = new Vector(this.width / 2, this.height / 2);
		this.pos = this.spawn.copy();
		this.resetBall();
	}

	setPlayerSide(player: IPlayerData) {
		if (player.side === SIDE.LEFT) this.leftUser = player;
		else if (player.side === SIDE.RIGHT) this.rightUser = player;
	}

	public resetBall() {
		this.pos = this.spawn.copy();
		const angle = (Math.random() * Math.PI) / 2 - Math.PI / 4;
		const speed = this.speed;
		this.vel = Vector.fromAngle(angle, speed);
		if (Math.random() > 0.5) this.vel.x *= -1;
		this.vel.divideBy(10);
	}

	outOfBounds() {
		if (this.pos.x > this.width + this.r) {
			this.playerRHasHit = true;
			this.resetBall();
		}

		if (this.pos.x < -this.r) {
			this.playerLHasHit = true;
			this.resetBall();
		}
	}

	hit() {
		for (const pad of [this.leftUser, this.rightUser]) {
			const padX: number = pad.pos.x;
			const padY: number = pad.pos.y;
			const ballX: number = this.pos.x;
			const ballY: number = this.pos.y;
			const r = this.r;

			if (padX - r < ballX && ballX < padX + pad.w + r) {
				if (padY - r < ballY && ballY < padY + pad.h + r) {
					const padCenter = new Vector(pad.pos.x + pad.w / 2, pad.pos.y + pad.h / 2);
					this.vel.x *= -1;
					this.vel.y *= -1;

					// this.vel = this.pos.copy().subtract(padCenter);
					// this.limit(this.vel, 10);

					// const a = Math.atan2(this.vel.y, this.vel.x);
					// if (a > -Math.PI / 2 && a < Math.PI / 2) {
					// 	this.vel = { x: Math.cos(a / 2), y: Math.sin(10) };
					// } else {
					// 	this.vel = this.rotate(this.vel, Math.PI);
					// 	const a = Math.atan2(this.vel.y, this.vel.x);
					// 	this.vel = { x: Math.cos(Math.PI + a / 2), y: Math.sin(10) };
					// }
				}
			}
		}
	}

	update() {
		this.pos.addTo(this.vel);


		if (this.pos.y + this.r >= this.height || this.pos.y - this.r <= 0) {
			this.pos.y = constrain(this.pos.y, this.r, this.height - this.r);
			this.vel.y *= -1;
		}
		this.hit();
		this.outOfBounds();
	}

	getPos(): Vector {
		return this.pos;
	}

	getVel(): Vector {
		return this.vel;
	}

	getSpeed(): number {
		return this.speed;
	}

	getRadius(): number {
		return this.r;
	}

	private limit(vector: Vector, max: number): Vector {
		const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
		if (magnitude > max) {
			const ratio = max / magnitude;
			vector.x *= ratio;
			vector.y *= ratio;
		}
		return vector;
	}

	private rotate(vector: IVector, angle: number): IVector {
		const cosA = Math.cos(angle);
		const sinA = Math.sin(angle);
		const newX = vector.x * cosA - vector.y * sinA;
		const newY = vector.x * sinA + vector.y * cosA;
		return { x: newX, y: newY };
	}
}
