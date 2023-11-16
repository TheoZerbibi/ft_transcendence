import P5 from 'p5';
import { SIDE } from './enums/Side';

export class Paddle {
	private name: string = 'IA';
	private avatar: string = 'https://cdn-icons-png.flaticon.com/512/4529/4529980.png';
	pos: P5.Vector;
	score: number;
	w: number;
	h: number;

	constructor(
		private p5: any,
		x: number,
		y: number,
		w: number,
		h: number,
		private side: SIDE,
	) {
		this.pos = p5.createVector(x, y);
		this.w = w;
		this.h = h;
		this.score = 0;
	}

	resizeUpdate(height: number, width: number, oldWidth: number, oldHeight: number) {
		this.pos.x = (this.pos.x / oldWidth) * width;
		this.pos.y = (this.pos.y / oldHeight) * height;
		this.w = (this.w / oldWidth) * width;
		this.h = (this.h / oldHeight) * height;
	}

	setPoint(score: number) {
		this.score = score;
	}

	getPoint() {
		return this.score;
	}

	update(pos: { x: number; y: number }, width: number, height: number) {
		this.pos.x = (pos.x / 700) * this.p5.width;
		this.pos.y = (pos.y / 400) * this.p5.height;
		// this.w = (width / 700) * this.p5.width - 50;
		// this.h = (height / 400) * this.p5.height;
	}

	setUser(name: string, avatar: string) {
		this.name = name;
		this.avatar = avatar;
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

	getSide() {
		return this.side;
	}

	setSide(side: SIDE) {
		this.side = side;
	}
}
