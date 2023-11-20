import P5 from 'p5';

import type { Paddle } from './Paddle';
export class Ball {
	private spawn: P5.Vector;
<<<<<<< HEAD
<<<<<<< HEAD
	vel: P5.Vector;
=======
	private vel: P5.Vector;
>>>>>>> 3afc756 (feat(pong): Continue responsivity)
=======
	vel: P5.Vector;
>>>>>>> 1f4dfd0 (feat(pong): Improve IA deplacement + add life visualation)
	pos: P5.Vector;

	constructor(
		private p5: any,
		private x: number,
		private y: number,
		private r: number,
		private speed = 5,
	) {
		this.spawn = p5.createVector(x, y);
		console.log('vec : ', this.spawn);
		this.speed = speed;
		this.r = r;
		this.pos = this.spawn.copy();
		this.vel = vel;
	}

	resetball(vel: P5.Vector) {
		this.vel = vel;
	}

	oldreset() {
		this.pos = this.spawn.copy();
		const angle = this.p5.random(-Math.PI / 4, Math.PI / 4);
		this.vel = P5.Vector.fromAngle(angle, this.speed);
		if (this.p5.random(1) > 0.5) this.vel.x *= -1;
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

	update(x: number, y: number) {
		this.pos.set(x, y);
	}

	serverUpdate(pos: { x: number; y: number }, vel: { x: number; y: number }, speed: number) {
		this.pos.x = (pos.x / 700) * this.p5.width;
		this.pos.y = (pos.y / 400) * this.p5.height;
		this.speed = speed;
		// this.r = this.p5.width / 50;
		this.vel.x = vel.x;
		this.vel.y = vel.y;
	}

	resizeUpdate(width: number, height: number, oldWidth: number, oldHeight: number) {
		this.spawn = this.p5.createVector(width / 2, height / 2);
		this.r = (this.r / Math.min(oldWidth, oldHeight)) * Math.min(width, height);
		this.pos.x = (this.pos.x / oldWidth) * width;
		this.pos.y = (this.pos.y / oldHeight) * height;
	}

	show(ball: P5.Image, ballLeft: P5.Image, ballRight: P5.Image, isWaiting: boolean) {
		this.p5.fill(255);
		this.p5.noStroke();
		this.p5.ellipse(this.pos.x, this.pos.y, this.r * 2);

		const imgSize = this.r * 3;
		if (isWaiting) {
			this.p5.image(ball, this.p5.width / 2 - imgSize / 2, this.p5.height / 2 - imgSize, imgSize, imgSize + 10);
			return;
		}

		this.p5.push();
		if (this.vel.x < 0) {
			// Lorsque la balle va vers la gauche
			this.p5.translate(this.pos.x, this.pos.y);
			const angle = this.p5.atan2(this.vel.y, this.vel.x);
			this.p5.rotate(angle);
			this.p5.image(ballLeft, -50, -imgSize / 2, imgSize * 2, imgSize);
		} else {
			// Lorsque la balle va vers la droite
			this.p5.translate(this.pos.x, this.pos.y);
			const angle = this.p5.atan2(this.vel.y, this.vel.x);
			this.p5.rotate(angle);
			this.p5.image(ballRight, -50, -imgSize / 2, imgSize * 2, imgSize); // Ajustement ici
		}

		this.p5.pop();
	}
}
