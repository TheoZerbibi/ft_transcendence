import P5 from 'p5';

// import type { Paddle } from './Paddle';

export class Ball {
	private spawn: P5.Vector;
	vel: P5.Vector;
	speed: number;
	pos: P5.Vector;

	constructor(
		private p5: any,
		private x: number,
		private y: number,
		vel: P5.Vector,
	) {
		this.spawn = p5.createVector(x, y);
		console.log('vec : ', this.spawn);
		this.pos = this.spawn.copy();
		this.vel = vel;
	}

	resetball(vel: P5.Vector) {
		this.vel = vel;
	}

	// outOfBounds() {
	// 	// If the ball is out of the screen,
	// 	// return the side, otherwise return false

	// 	if (this.pos.x > this.p5.width + this.r) {
	// 		this.oldreset();
	// 		return 'right';
	// 	}

	// 	if (this.pos.x < -this.r) {
	// 		this.oldreset();
	// 		return 'left';
	// 	}

	// 	return false;
	// }

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

	update(x: number, y: number) {
		console.log('x : ', ((x / 100) * this.p5.width * 70) / 100);
		console.log('y : ', ((y / 100) * this.p5.width * 70) / 100);
		this.pos.set(((x / 100) * this.p5.width * 70) / 100, ((y / 100) * this.p5.width * 70) / 100);
	}

	show(radius: number) {
		this.p5.fill(255);
		this.p5.noStroke();
		this.p5.ellipse(this.pos.x, this.pos.y, ((radius / 100) * this.p5.width * 70) / 100);
	}
}
