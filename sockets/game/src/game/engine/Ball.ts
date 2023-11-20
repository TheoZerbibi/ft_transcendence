// import P5 from 'p5';
<<<<<<< HEAD
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
					if (this.hitCounter >= 100) this.vel.divideBy(5);
					else if (this.hitCounter >= 50) this.vel.divideBy(10);
					else if (this.hitCounter >= 30) this.vel.divideBy(13);
					else if (this.hitCounter >= 20) this.vel.divideBy(15);
					else if (this.hitCounter >= 15) this.vel.divideBy(18);
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
=======

// import type { Paddle } from './Paddle';

// export class Ball {
// 	private spawn: P5.Vector;
// 	vel: P5.Vector;
// 	speed: number;
// 	pos: P5.Vector;

// 	constructor(
// 		private p5: any,
// 		private x: number,
// 		private y: number,
// 		private r: number,
// 		speed = 5,
// 	) {
// 		this.spawn = p5.createVector(x, y);
// 		this.speed = speed;
// 		this.r = r;
// 		this.pos = this.spawn.copy();
// 		this.resetball();
// 	}

// 	resetball() {
// 		this.pos = this.spawn.copy();
// 		const angle = this.p5.random(-Math.PI / 4, Math.PI / 4);
// 		this.vel = P5.Vector.fromAngle(angle, this.speed);
// 		if (this.p5.random(1) > 0.5) this.vel.x *= -1;
// 	}

// 	outOfBounds() {
// 		// If the ball is out of the screen,
// 		// return the side, otherwise return false

// 		if (this.pos.x > this.p5.width + this.r) {
// 			this.resetball();
// 			return 'right';
// 		}

// 		if (this.pos.x < -this.r) {
// 			this.resetball();
// 			return 'left';
// 		}

// 		return false;
// 	}

// 	hit(p1: Paddle, p2: Paddle) {
// 		for (const pad of [p1, p2]) {
// 			const padX = pad.pos.x;
// 			const padY = pad.pos.y;
// 			const ballX = this.pos.x;
// 			const ballY = this.pos.y;
// 			const r = this.r;

// 			// if ball collides on x-axis
// 			if (padX - r < ballX && ballX < padX + pad.w + r) {
// 				// and on y-axis
// 				if (padY - r < ballY && ballY < padY + pad.h + r) {
// 					// ball collided

// 					const padCenter = this.p5.createVector(pad.pos.x + pad.w / 2, pad.pos.y + pad.h / 2);

// 					// Vector from center of pad to center of ball
// 					this.vel = this.pos.copy().sub(padCenter);
// 					this.vel.limit(10);

// 					// basically halve that angle so it points more to the center
// 					const a = this.vel.heading();
// 					if (a > -Math.PI / 2 && a < Math.PI / 2) {
// 						this.vel = P5.Vector.fromAngle(a / 2, 10);
// 					} else {
// 						this.vel.rotate(Math.PI);
// 						const a = this.vel.heading();
// 						this.vel = P5.Vector.fromAngle(Math.PI + a / 2, 10);
// 					}
// 				}
// 			}
// 		}
// 	}

// 	update() {
// 		this.pos.add(this.vel);

// 		if (this.pos.y + this.r >= this.p5.height || this.pos.y - this.r <= 0) {
// 			this.pos.y = this.p5.constrain(this.pos.y, this.r, this.p5.height - this.r);
// 			this.vel.y *= -1;
// 		}
// 	}

// 	show() {
// 		this.p5.fill(255);
// 		this.p5.noStroke();
// 		this.p5.ellipse(this.pos.x, this.pos.y, this.r * 2);
// 	}
// }
>>>>>>> 6ff4cb1 (feat(game): Start implementing PongGame in Socket Server)
