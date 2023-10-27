import P5 from 'p5';

export class Paddle {
	private y: number;
	pos: P5.Vector;
	score: number;
	w: number;
	h: number;

	constructor(
		private p5: any,
		private x: number,
		ratio: number,
	) {
		this.x = x;
		this.y = (((ratio * 100) / 2 / 100) * window.innerWidth * 70) / 90;
		this.pos = this.p5.createVector(x, this.y);
		this.w = ((100 / 75 / 100) * window.innerWidth * 70) / 100;
		this.h = (((ratio * 100) / 5 / 100) * window.innerWidth * 70) / 90;
		this.score = 0;
	}

	resizeUpdate(ratio: number, width: number, oldWidth: number, oldHeight: number) {
		this.x = this.pos.x;
		this.pos.y = (this.pos.y * ratio * width) / oldHeight;
		this.w = (this.w * width) / oldWidth;
		this.h = (this.h * ratio * width) / oldHeight;
	}

	addPoint() {
		this.score++;
	}

	update(pos: number, width: number, height: number) {
		this.pos.y = ((pos / 100) * window.innerWidth * 70) / 90;
		this.w = ((width / 100) * window.innerWidth * 70) / 100;
		this.h = ((height / 100) * window.innerWidth * 70) / 90;
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
