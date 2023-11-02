// import P5 from 'p5';
import { IPlayerData } from '../impl/interfaces/IPlayerData';
import { SIDE } from './enums/Side';
import { IVector } from './interfaces/IVector';

export class Ball {
	private ratio;
	private rightUser: IPlayerData;
	private leftUser: IPlayerData;
	r: number;
	vel: IVector;
	speed: number;
	pos: IVector;
	playerLHasHit: boolean = false;
	playerRHasHit: boolean = false;

	constructor(ratio: number) {
		this.pos = { x: 50, y: (this.ratio * 100) / 2 };
		this.speed = (ratio * 100) / 900;
		this.r = (ratio * 100) / 70;
		this.ratio = ratio;
		this.resetBall();
	}

	setPlayerSide(player: IPlayerData) {
		if (player.side === SIDE.LEFT) this.leftUser = player;
		else if (player.side === SIDE.RIGHT) this.rightUser = player;
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

		this.hit();

		if (this.pos.x > 100 + this.r || this.pos.x < -this.r) {
			console.log(this.pos.x + this.r);
			if (this.pos.x > 100 + this.r) this.playerLHasHit = true;
			else if (this.pos.x < -this.r) this.playerRHasHit = true;
			this.resetBall();
		}
	}

	hit() {
		if (!this.rightUser || !this.leftUser) return;

		if (100 / 70 - this.r < this.pos.x && this.pos.x < 100 / 70 + 100 / 70 + this.r) {
			if (this.leftUser.y - this.r < this.pos.y && this.pos.y < this.leftUser.y + this.leftUser.h + this.r) {
				const centerX: number = 100 / 70 + 100 / 70 / 2;
				const centerY: number = this.leftUser.y + this.leftUser.h / 2;

				this.vel.x = this.pos.x - centerX;
				this.vel.y = this.pos.y - centerY;

				const magnitude: number = Math.sqrt(this.vel.x ** 2 + this.vel.y ** 2);

				if (magnitude > 10) {
					this.vel.x = (this.vel.x * 10) / magnitude;
					this.vel.y = (this.vel.y * 10) / magnitude;
				}

				const angle: number = Math.atan2(this.vel.y, this.vel.x);

				if (angle > -(Math.PI / 2) && angle < Math.PI / 2) {
					this.vel.x = Math.cos(angle / 2) * this.speed;
					this.vel.y = Math.sin(angle / 2) * this.speed;
				} else {
					const x: number = this.vel.x;
					const y: number = this.vel.y;

					this.vel.x = x * Math.cos(Math.PI) - y * Math.sin(Math.PI);
					this.vel.y = x * Math.sin(Math.PI) + y * Math.cos(Math.PI);

					const angle: number = Math.atan2(this.vel.y, this.vel.x);

					this.vel.x = Math.cos(Math.PI + angle / 2) * this.speed;
					this.vel.y = Math.sin(Math.PI + angle / 2) * this.speed;
				}
			}
		}

		if (100 - (100 / 70) * 2 - this.r <= this.pos.x && this.pos.x <= 100 - (100 / 70) * 2 + 100 / 70 + this.r) {
			if (this.rightUser.y - this.r <= this.pos.y && this.pos.y <= this.rightUser.y + this.rightUser.h + this.r) {
				const centerX: number = 100 - (100 / 70) * 2 + 100 / 70 / 2;
				const centerY: number = this.rightUser.y + this.rightUser.h / 2;

				this.vel.x = this.pos.x - centerX;
				this.vel.y = this.pos.y - centerY;

				const magnitude: number = Math.sqrt(this.vel.x ** 2 + this.vel.y ** 2);

				if (magnitude > 10) {
					//p5.vector.limit
					this.vel.x = (this.vel.x * 10) / magnitude;
					this.vel.y = (this.vel.y * 10) / magnitude;
				}
				const angle: number = Math.atan2(this.vel.y, this.vel.x); //heading

				if (angle > -Math.PI / 2 && angle < Math.PI / 2) {
					this.vel.x = Math.cos(angle / 2) * this.speed;
					this.vel.y = Math.sin(angle / 2) * this.speed;
				} else {
					const x: number = this.vel.x;
					const y: number = this.vel.y;

					this.vel.x = x * Math.cos(Math.PI) - y * Math.sin(Math.PI);
					this.vel.y = x * Math.sin(Math.PI) + y * Math.cos(Math.PI);

					const angle: number = Math.atan2(this.vel.y, this.vel.x);

					this.vel.x = Math.cos(Math.PI + angle / 2) * this.speed;
					this.vel.y = Math.sin(Math.PI + angle / 2) * this.speed;
				}
			}
		}
	}

	public resetBall() {
		this.pos = { x: 100 / 2, y: (this.ratio * 100) / 2 };
		this.vel = null;
		const angle = (Math.random() * Math.PI) / 2 - Math.PI / 4;
		const speed = this.speed;
		this.vel = { x: speed * Math.cos(angle), y: speed * Math.sin(angle) };
		if (Math.random() > 0.5) this.vel.x *= -1;
	}
}
