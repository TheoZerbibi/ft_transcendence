import P5 from 'p5';

// import type { Paddle } from './Paddle';

export class Ball {
	private r: number;
	private spawn: P5.Vector;
	private pos: P5.Vector;
	private vel: P5.Vector;

	constructor(
		private p5: any,
		private x: number,
		private y: number,
		private ratio: number,
		private speed: number = 5,
	) {
		this.r = (((ratio * 100) / 75 / 100) * window.innerWidth * 70) / 50;
		this.spawn = p5.createVector(x, y);
		this.pos = this.spawn.copy();
		this.vel = P5.Vector.fromAngle(p5.random(-Math.PI / 4, Math.PI / 4), speed);
	}

	resetball() {
		this.pos = this.spawn.copy();
		const angle = this.p5.random(-Math.PI / 4, Math.PI / 4);
		this.vel = P5.Vector.fromAngle(angle, 5);
		if (this.p5.random(1) > 0.5) this.vel.x *= -1;
	}

	setVel(vel: P5.Vector) {
		this.vel = vel;
	}

	getVel(): P5.Vector {
		return this.vel;
	}

	setPos(pos: P5.Vector) {
		this.pos = pos;
	}

	getPos(): P5.Vector {
		return this.pos;
	}

	getRadius(): number {
		return this.r;
	}

	setRadius(radius: number) {
		this.r = radius;
	}

	resizeUpdate(ratio: number, width: number, height: number, oldWidth: number, oldHeight: number) {
		this.r = (this.r * ratio * width) / oldHeight;
		this.pos.x = (this.pos.x * width) / oldWidth;
		this.pos.y = (this.pos.y * height) / oldHeight;
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

	show() {
		this.p5.fill(255);
		this.p5.noStroke();
		this.p5.ellipse(this.pos.x, this.pos.y, this.r * 2);
	}
}
