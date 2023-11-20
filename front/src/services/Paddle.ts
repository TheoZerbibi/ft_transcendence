import P5 from 'p5';

export class Paddle {
	pos: P5.Vector;
	score: number;
	w: number;
	h: number;

	constructor(
		private p5: any,
		private x: number,
		private y: number,
		w: number,
		h: number,
	) {
		this.pos = this.p5.createVector(x, y);
		this.w = w;
		this.h = h;
		this.score = 0;
		console.log(p5.width, p5.height);
	}

	move(amt: number) {
		this.pos.y += amt;
		this.pos.y = this.p5.constrain(this.pos.y, 10, this.p5.height - 10 - this.h);
	}

	show() {
		this.p5.noStroke();
		this.p5.fill(255);
		this.p5.rect(this.pos.x, this.pos.y, this.w, this.h);
	}
}
