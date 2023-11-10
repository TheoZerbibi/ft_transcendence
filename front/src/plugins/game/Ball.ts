import P5 from 'p5';

import type { Paddle } from './Paddle';

// export class Ball {
// 	private r: number;
// 	private spawn: P5.Vector;
// 	private pos: P5.Vector;
// 	private vel: P5.Vector;

// 	constructor(
// 		private p5: any,
// 		private x: number,
// 		private y: number,
// 		private ratio: number,
// 		private speed: number = 5,
// 	) {
// 		this.r = (((ratio * 100) / 75 / 100) * window.innerWidth * 70) / 50;
// 		console.log('ball : ', x, ' ', y);
// 		this.spawn = p5.createVector(p5.width / 2, ((22.5 / 100) * window.innerWidth * 70) / 77.5);
// 		this.pos = this.spawn.copy();
// 		this.vel = P5.Vector.fromAngle(p5.random(-Math.PI / 4, Math.PI / 4), speed);
// 	}

// 	resetball() {
// 		this.pos = this.spawn.copy();
// 		const angle = this.p5.random(-Math.PI / 4, Math.PI / 4);
// 		this.vel = P5.Vector.fromAngle(angle, 5);
// 		if (this.p5.random(1) > 0.5) this.vel.x *= -1;
// 	}

// 	setVel(vel: P5.Vector) {
// 		this.vel = vel;
// 	}

// 	getVel(): P5.Vector {
// 		return this.vel;
// 	}

// 	setPos(pos: P5.Vector) {
// 		this.pos = pos;
// 	}

// 	getPos(): P5.Vector {
// 		return this.pos;
// 	}

// 	getRadius(): number {
// 		return this.r;
// 	}

// 	setRadius(radius: number) {
// 		this.r = radius;
// 	}

// 	resizeUpdate(ratio: number, width: number, height: number, oldWidth: number, oldHeight: number) {
// 		this.r = (this.r * ratio * width) / oldHeight;
// 		this.pos.x = (this.pos.x * width) / oldWidth;
// 		this.pos.y = (this.pos.y * height) / oldHeight;
// 	}

// 	update(pos: { x: number; y: number }, vel: { x: number; y: number }, speed: number, radius: number) {
// 		this.pos.add(this.vel);
// 		this.pos.x = ((pos.x / 100) * window.innerWidth * 70) / 77.5;
// 		this.pos.y = ((pos.y / 100) * window.innerWidth * 70) / 77.5;
// 		this.vel.x = ((vel.x / 100) * window.innerWidth * 70) / 77.5;
// 		this.vel.y = ((vel.y / 100) * window.innerWidth * 70) / 77.5;
// 		this.speed = ((speed / 100) * window.innerWidth * 70) / 100;
// 		this.r = ((radius / 100) * window.innerWidth * 70) / 50;
// 	}

// 	show() {
// 		this.p5.fill(255);
// 		this.p5.noStroke();
// 		this.p5.ellipse(this.pos.x, this.pos.y, this.r * 2);
// 	}
// }
export class Ball {
	private spawn: P5.Vector;
	private pos: P5.Vector;
	private vel: P5.Vector;

	constructor(
		private p5: any,
		private x: number,
		private y: number,
		private r: number,
		private speed = 5,
	) {
		this.spawn = p5.createVector(x, y);
		this.speed = speed;
		this.r = r;
		this.pos = this.spawn.copy();
		this.resetball();
	}

	resetball() {
		this.pos = this.spawn.copy();
		const angle = this.p5.random(-Math.PI / 4, Math.PI / 4);
		this.vel = P5.Vector.fromAngle(angle, this.speed);
		if (this.p5.random(1) > 0.5) this.vel.x *= -1;
	}

	outOfBounds() {
		// If the ball is out of the screen,
		// return the side, otherwise return false

		if (this.pos.x > this.p5.width + this.r) {
			this.resetball();
			return 'right';
		}

		if (this.pos.x < -this.r) {
			this.resetball();
			return 'left';
		}

		return false;
	}

	hit(p1: Paddle, p2: Paddle) {
		for (const pad of [p1, p2]) {
			const padX: number = pad.pos.x;
			const padY: number = pad.pos.y;
			const ballX: number = this.pos.x;
			const ballY: number = this.pos.y;
			const r = this.r;

			if (padX - r < ballX && ballX < padX + pad.w + r) {
				if (padY - r < ballY && ballY < padY + pad.h + r) {
					const padCenter = this.p5.createVector(pad.pos.x + pad.w / 2, pad.pos.y + pad.h / 2);

					this.vel = this.pos.copy().sub(padCenter);
					this.vel.limit(10);

					const a = this.vel.heading();
					if (a > -Math.PI / 2 && a < Math.PI / 2) {
						this.vel = P5.Vector.fromAngle(a / 2, 10);
					} else {
						this.vel.rotate(Math.PI);
						const a = this.vel.heading();
						this.vel = P5.Vector.fromAngle(Math.PI + a / 2, 10);
					}
				}
			}
		}
	}

	update() {
		this.pos.add(this.vel);

		if (this.pos.y + this.r >= this.p5.height || this.pos.y - this.r <= 0) {
			this.pos.y = this.p5.constrain(this.pos.y, this.r, this.p5.height - this.r);
			this.vel.y *= -1;
		}
	}

	serverUpdate(pos: { x: number; y: number }, vel: { x: number; y: number }, speed: number) {
		this.pos.x = (pos.x / 700) * this.p5.width;
		this.pos.y = (pos.y / 400) * this.p5.height;
		this.speed = speed;
		this.r = this.p5.width / 50;
		this.vel.x = vel.x;
		this.vel.y = vel.y;
	}

	resizeUpdate(width: number, height: number, oldWidth: number, oldHeight: number) {
		this.r = (this.r / Math.min(oldWidth, oldHeight)) * Math.min(width, height);
		this.pos.x = (this.pos.x / oldWidth) * width;
		this.pos.y = (this.pos.y / oldHeight) * height;
	}

	show() {
		this.p5.fill(255);
		this.p5.noStroke();
		this.p5.ellipse(this.pos.x, this.pos.y, this.r * 2);
	}
}
