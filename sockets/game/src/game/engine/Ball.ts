// import P5 from 'p5';
import { IPlayerData } from '../impl/interfaces/IPlayerData';
import { Vector } from './utils/Vector';
import { SIDE } from './enums/Side';
import { constrain } from './utils/MathUtils';
import { Game } from '../impl/Game';

export class Ball {
	private r: number = 10;
	private speed: number = 10;
	private hitCounter: number = 0;
	private spawn: Vector;
	private pos: Vector;
	private vel: Vector;
	private game: Game;

	private rightUser: IPlayerData;
	private leftUser: IPlayerData;
	playerLHasHit: boolean = false;
	playerRHasHit: boolean = false;

	constructor(
		private width: number,
		private height: number,
	) {
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
		this.vel = Vector.fromAngle(angle, 1);
		if (Math.random() > 0.5) this.vel.x *= -1;
		this.vel.divideBy(3);
	}

	outOfBounds() {
		if (this.pos.x > this.width + this.r) {
			this.game.addPoint(SIDE.LEFT);
			this.hitCounter = 0;
			this.resetBall();
		}

		if (this.pos.x < -this.r) {
			this.game.addPoint(SIDE.RIGHT);
			this.hitCounter = 0;
			this.resetBall();
		}
	}

	setGame(game: Game) {
		this.game = game;
	}

	hit() {
		for (const pad of [this.leftUser, this.rightUser]) {
			const padX: number = pad.pos.x;
			const padY: number = pad.pos.y;
			const padWidth: number = pad.w;
			const padHeight: number = pad.h;
			const ballX: number = this.pos.x;
			const ballY: number = this.pos.y;
			const ballR = this.r;

			if (padX - ballR < ballX && ballX < padX + padWidth + ballR) {
				if (padY - ballR < ballY && ballY < padY + padHeight + ballR) {
					this.hitCounter++;
					const padCenter = new Vector(padX + padWidth / 2, padY + padHeight / 2);

					this.vel = this.pos.copy().subtract(padCenter);
					this.vel.limit(10);

					const a = this.vel.heading();
					if (a > -Math.PI / 2 && a < Math.PI / 2) {
						this.vel = Vector.fromAngle(a / 2, 10);
					} else {
						this.vel.rotate(Math.PI);
						const a = this.vel.heading();
						this.vel = Vector.fromAngle(Math.PI + a / 2, 10);
					}
					if (this.hitCounter >= 100) {
						this.rightUser.setMoveSpeed(7);
						this.leftUser.setMoveSpeed(7);
						this.vel.divideBy(5);
					} else if (this.hitCounter >= 50) {
						this.rightUser.setMoveSpeed(6.5);
						this.leftUser.setMoveSpeed(6.5);
						this.vel.divideBy(10);
					} else if (this.hitCounter >= 30) this.vel.divideBy(13);
					else if (this.hitCounter >= 20) {
						this.rightUser.setMoveSpeed(6);
						this.leftUser.setMoveSpeed(6);
						this.vel.divideBy(15);
					} else if (this.hitCounter >= 15) this.vel.divideBy(18);
					else if (this.hitCounter >= 10) this.vel.divideBy(20);
					else this.vel.divideBy(25);
				}
			}
		}
	}

	update() {
		this.outOfBounds();
		this.pos.addTo(this.vel);
		if (this.pos.y + this.r >= this.height || this.pos.y - this.r <= 0) {
			this.pos.y = constrain(this.pos.y, this.r, this.height - this.r);
			this.vel.y *= -1;
		}
		this.hit();
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
}
