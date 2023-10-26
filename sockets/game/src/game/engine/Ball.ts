// import P5 from 'p5';
import { IVector } from './interfaces/IVector';

export class Ball {
	private ratio;
	r: number;
	vel: IVector;
	speed: number;
	pos: IVector;
	playerLHasHit: boolean = false;
	playerRHasHit: boolean = false;

	constructor(ratio: number) {
		this.pos = { x: 100 / 2, y: (this.ratio * 100) / 2 };
		this.speed = (ratio * 100) / 500;
		this.r = (ratio * 100) / 75;
		this.ratio = ratio;
		this.resetBall();
	}

	public update() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;

		if (this.pos.y + this.r >= this.ratio * 100 || this.pos.y - this.r <= 0) this.vel.y *= -1;
		if (this.pos.y <= 0) {
			this.pos.y = this.r * 2;
			this.vel.y *= -1;
		}
		if (this.pos.y >= 100) {
			this.pos.y = 100 - this.r * 2;
			this.vel.y *= -1;
		}

		if (this.pos.x > 100 + this.r || this.pos.x < -this.r) {
			console.log(this.pos.x + this.r);
			if (this.pos.x > 100 + this.r) this.playerLHasHit = true;
			else if (this.pos.x < -this.r) this.playerRHasHit = true;
			this.resetBall();
		}
	}

	// hit(p1: Paddle, p2: Paddle) {
	// 	for (const pad of [p1, p2]) {
	// 		const padX = pad.pos.x;
	// 		const padY = pad.pos.y;
	// 		const ballX = this.pos.x;
	// 		const ballY = this.pos.y;
	// 		const r = this.r;

	// 		// if ball collides on x-axis
	// 		if (padX - r < ballX && ballX < padX + pad.w + r) {
	// 			// and on y-axis
	// 			if (padY - r < ballY && ballY < padY + pad.h + r) {
	// 				// ball collided

	// 				const padCenter = this.p5.createVector(pad.pos.x + pad.w / 2, pad.pos.y + pad.h / 2);

	// 				// Vector from center of pad to center of ball
	// 				this.vel = this.pos.copy().sub(padCenter);
	// 				this.vel.limit(10);

	// 				// basically halve that angle so it points more to the center
	// 				const a = this.vel.heading();
	// 				if (a > -Math.PI / 2 && a < Math.PI / 2) {
	// 					this.vel = P5.Vector.fromAngle(a / 2, 10);
	// 				} else {
	// 					this.vel.rotate(Math.PI);
	// 					const a = this.vel.heading();
	// 					this.vel = P5.Vector.fromAngle(Math.PI + a / 2, 10);
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	public resetBall() {
		this.pos = { x: 100 / 2, y: (this.ratio * 100) / 2 };
		this.vel = null;
		const angle = (Math.random() * Math.PI) / 2 - Math.PI / 4;
		const speed = this.speed;
		this.vel = { x: speed * Math.cos(angle), y: speed * Math.sin(angle) };
		if (Math.random() > 0.5) this.vel.x *= -1;
	}
}
