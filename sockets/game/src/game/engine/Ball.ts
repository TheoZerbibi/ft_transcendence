// import P5 from 'p5';
import { IVector } from './interfaces/IVector';

// import type { Paddle } from './Paddle';

// export class Ball {
// 	private spawn: IVector;
// 	vel: IVector;
// 	speed: number;
// 	pos: IVector;

// 	constructor(
// 		private r: number,
// 		private width: number,
// 		private height: number,
// 		speed = 5,
// 	) {
// 		this.spawn = { x: this.width / 2, y: this.height / 2 };
// 		this.speed = speed;
// 		this.r = r;
// 		this.pos = this.spawn;
// 		this.resetball();
// 	}

// 	resetball() {
// 		this.pos = this.spawn;
// 		const angle = (Math.random() * Math.PI) / 2 - Math.PI / 4;
// 		const speed = this.speed;
// 		this.vel = { x: speed * Math.cos(angle), y: speed * Math.sin(angle) };
// 		if (Math.random() > 0.5) this.vel.x *= -1;
// 	}

// 	outOfBounds() {
// 		// If the ball is out of the screen,
// 		// return the side, otherwise return false

// 		if (this.pos.x > this.width + this.r) {
// 			this.resetball();
// 			return 'right';
// 		}

// 		if (this.pos.x < -this.r) {
// 			this.resetball();
// 			return 'left';
// 		}

// 		return false;
// 	}

// 	// hit(p1: any, p2: any) {
// 	// 	for (const pad of [p1, p2]) {
// 	// 		const padX = pad.pos.x;
// 	// 		const padY = pad.pos.y;
// 	// 		const ballX = this.pos.x;
// 	// 		const ballY = this.pos.y;
// 	// 		const r = this.r;
// 	// 		// if ball collides on x-axis
// 	// 		if (padX - r < ballX && ballX < padX + pad.w + r) {
// 	// 			// and on y-axis
// 	// 			if (padY - r < ballY && ballY < padY + pad.h + r) {
// 	// 				// ball collided
// 	// 				const padCenter = this.p5.createVector(pad.pos.x + pad.w / 2, pad.pos.y + pad.h / 2);
// 	// 				// Vector from center of pad to center of ball
// 	// 				this.vel = this.pos.copy().sub(padCenter);
// 	// 				this.vel.limit(10);
// 	// 				// basically halve that angle so it points more to the center
// 	// 				const a = this.vel.heading();
// 	// 				if (a > -Math.PI / 2 && a < Math.PI / 2) {
// 	// 					this.vel = P5.Vector.fromAngle(a / 2, 10);
// 	// 				} else {
// 	// 					this.vel.rotate(Math.PI);
// 	// 					const a = this.vel.heading();
// 	// 					this.vel = P5.Vector.fromAngle(Math.PI + a / 2, 10);
// 	// 				}
// 	// 			}
// 	// 		}
// 	// 	}
// 	// }

// 	update() {
// 		this.pos.x += this.vel.x;
// 		this.pos.y += this.vel.y;

// 		// Gérer la collision avec les bords de l'arène
// 		if (this.pos.y + this.r >= this.height || this.pos.y - this.r <= 0) {
// 			this.pos.y = Math.min(Math.max(this.pos.y, this.r), this.height - this.r);
// 			this.vel.y *= -1;
// 		}
// 	}
// }

export class Ball {
	private spawn: IVector;
	r: number;
	vel: IVector;
	speed: number;
	pos: IVector;

	constructor() {
		this.spawn = { x: 100 / 2, y: 100 / 2 };
		this.speed = ((9 / 16) * 100) / 125;
		this.r = ((9 / 16) * 100) / 75;
		this.pos = this.spawn;
		console.log(this.pos);
		this.resetBall();
	}

	public update() {
		// Mettre à jour la position de la balle en fonction de la vitesse
		// this.pos.x += this.vel.x;
		// this.pos.y += this.vel.y;
		// // Gérer la collision avec les bords de l'arène
		// if (this.pos.y + this.r >= this.spawn.y || this.pos.y - this.r <= 0) {
		// 	this.vel.y *= -1;
		// }
		// if (this.pos.x + this.r >= this.spawn.x || this.pos.x - this.r <= 0) {
		// 	this.vel.x *= -1;
		// }
	}

	public resetBall() {
		this.pos = this.spawn;
		// const angle = (Math.random() * Math.PI) / 2 - Math.PI / 4;
		// const speed = this.speed;
		// this.vel = { x: speed * Math.cos(angle), y: speed * Math.sin(angle) };
		// if (Math.random() > 0.5) this.vel.x *= -1;
	}
}
