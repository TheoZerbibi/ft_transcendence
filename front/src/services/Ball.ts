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
		console.log('ball : ', x, ' ', y);
		this.spawn = p5.createVector(
			((50 / 100) * window.innerWidth * 70) / 77.5,
			((22.5 / 100) * window.innerWidth * 70) / 77.5,
		);
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

	update(pos: { x: number; y: number }, vel: { x: number; y: number }, speed: number, radius: number) {
		this.pos.add(this.vel);
		this.pos.x = ((pos.x / 100) * window.innerWidth * 70) / 77.5;
		this.pos.y = ((pos.y / 100) * window.innerWidth * 70) / 77.5;
		this.vel.x = ((vel.x / 100) * window.innerWidth * 70) / 77.5;
		this.vel.y = ((vel.y / 100) * window.innerWidth * 70) / 77.5;
		this.speed = ((speed / 100) * window.innerWidth * 70) / 100;
		this.r = ((radius / 100) * window.innerWidth * 70) / 50;
	}

	show() {
		this.p5.fill(255);
		this.p5.noStroke();
		this.p5.ellipse(this.pos.x, this.pos.y, this.r * 2);
	}
}
