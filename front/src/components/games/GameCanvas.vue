<template>
	<v-container>
		<div id="app">
			<div id="game-canvas" />
		</div>
		<CountdownOverlay v-if="showCountdown" />
	</v-container>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import P5 from 'p5';

import { Ball } from '../../plugins/game/Ball';
import { Paddle } from '../../plugins/game/Paddle';
import { DIRECTION } from '../../plugins/game/enums/Direction';
import { SIDE } from '../../plugins/game/enums/Side';
import { useCountdownStore } from '../../stores/countdown';
import { useSocketStore } from '../../stores/websocket';
import CountdownOverlay from '../utils/Countdown.vue';

const countdownStore = useCountdownStore();

export default {
	name: 'GameCanvas',
	components: {
		CountdownOverlay,
	},
	setup() {
		const webSocketStore = useSocketStore();

		const isConnected = computed(() => webSocketStore.isConnected);
		const socket = computed(() => webSocketStore.getSocket);
		return {
			isConnected,
			socket,
		};
	},
	data() {
		return {
			showCountdown: false,
		};
	},
	mounted() {
		const route = useRoute();
		const gameData = {
			start: false as boolean,
			go: false as boolean,
			p1: null as Paddle | null,
			p2: null as Paddle | null,
			player: null as Paddle | null,
			ball: null as Ball | null,
			ratio: (9 / 20) as number,
			socket: this.socket as any,
			gameUID: route.params.uid as string,
		};
		const script = function (p5: any) {
			const cDiv = document.getElementById('game-canvas');
			const textOffsetX: number = 50;
			const textOffsetY: number = 10;
			let width: number, height: number, retroFont: string;

			p5.preload = () => {
				retroFont = p5.loadFont('/fonts/ARCADECLASSIC.TTF');
			};

			p5.setup = () => {
				if (!cDiv) return;
				width = cDiv.offsetWidth;
				height = cDiv.offsetWidth / 2;
				const canvas = p5.createCanvas(width, height);
				canvas.parent('game-canvas');

				gameData.ball = new Ball(p5, width / 2, height / 2, 10);
				gameData.p1 = new Paddle(p5, 20, height / 2 - 50, 10, 100, SIDE.LEFT);
				gameData.p2 = new Paddle(p5, width - 30, height / 2 - 50, 10, 100, SIDE.RIGHT);
			};

			p5.draw = () => {
				p5.background(51);
				movePaddles();
				backdrop();
				if (!gameData.p1 || !gameData.p2 || !gameData.ball) return;
				gameData.ball.outOfBounds();
				if (gameData.go) gameData.ball.update();
				gameData.ball.hit(gameData.p1, gameData.p2);
				gameData.p1.show();
				gameData.p2.show();
				gameData.ball.show();
			};

			/**
			 * Function for write score and drawing line in the center.
			 */
			function backdrop() {
				if (!gameData.p1 || !gameData.p2) return;
				p5.stroke(80);
				p5.strokeWeight(width / 200);

				const dottedLength = width / 100;
				let y = dottedLength / 2;

				while (y < p5.height) {
					p5.line(p5.width / 2, y, p5.width / 2, y + dottedLength);
					y += dottedLength * 2;
				}

				const _r = width / 1736;
				const _size = 100 * _r;
				p5.textFont(retroFont);
				p5.textSize(_size);
				p5.noStroke();
				p5.fill(80);

				p5.textAlign(p5.RIGHT, p5.TOP);
				p5.text(gameData.p1.score, width / 2 - textOffsetX, textOffsetY);

				p5.textAlign(p5.LEFT);
				p5.text(gameData.p2.score, width / 2 + textOffsetX, textOffsetY);
			}

			p5.windowResized = () => {
				if (!cDiv || !gameData.ball || !gameData.p1 || !gameData.p2) return;
				const oldWidth: number = width;
				const oldHeight: number = height;
				width = cDiv.offsetWidth;
				height = cDiv.offsetWidth / 2;
				p5.resizeCanvas(width, height);
				gameData.ball.resizeUpdate(width, height, oldWidth, oldHeight);
				gameData.p1.resizeUpdate(height, width, oldWidth, oldHeight);
				gameData.p2.resizeUpdate(height, width, oldWidth, oldHeight);
			};

			// p5.mouseMoved = () => {
			// 	if (!gameData.ball || !gameData.socket) return;
			// 	if (!gameData.player || !gameData.start) {
			// 		if (!gameData.p1 || !gameData.p1.pos || gameData.start) return;
			// 		if (p5.mouseY + gameData.p1.h >= p5.height) gameData.p1.pos.y = p5.height - gameData.p1.h;
			// 		else gameData.p1.pos.y = Math.max(0, Math.min(p5.height, p5.mouseY));
			// 		return;
			// 	}
			// };

			/**
			 * Function for moving the player Paddle.
			 */
			function movePaddles() {
				if (!gameData.ball || !gameData.socket) return;
				if (!gameData.player || !gameData.start) {
					localMovePaddles();
					return;
				}

				if (p5.keyIsDown(87)) {
					gameData.socket.emit('player-move', {
						gameUID: gameData.gameUID,
						direction: DIRECTION.DOWN,
					});
				}

				if (p5.keyIsDown(83)) {
					gameData.socket.emit('player-move', {
						gameUID: gameData.gameUID,
						direction: DIRECTION.UP,
					});
				}
			}

			/**
			 * Function for moving the player Paddle in local.
			 */
			function localMovePaddles() {
				if (!gameData.ball || !gameData.p1 || gameData.start) return;
				if (p5.keyIsDown(87)) {
					gameData.p1.move(-5);
				}

				if (p5.keyIsDown(83)) {
					gameData.p1.move(5);
				}
			}
		};
		new P5(script);

		this.socket.on('game-start', () => {
			gameData.socket = this.socket;
			countdownStore.setSeconds(5);
			this.showCountdown = true;
		});

		this.socket.on('countdown', (data: number) => {
			countdownStore.setSeconds(data);
			if (data <= 0) {
				this.showCountdown = false;
				gameData.start = true;
				setTimeout(() => {
					gameData.go = true;
				}, 1000);
			}
		});

		this.socket.on('game-update', (data: any) => {
			gameData.ball?.serverUpdate(data.position, data.velocity, data.speed);
		});

		this.socket.on('player-moved', (data: any) => {
			if (data.p1) gameData.p1?.update(data.p1.position, data.p1.width, data.p1.height);
			if (data.p2) gameData.p2?.update(data.p2.position, data.p2.width, data.p2.height);
		});

		this.socket.on('game-score', (data: any) => {
			gameData.p1?.setPoint(data.p1);
			gameData.p2?.setPoint(data.p2);
		});

		this.socket.on('player-side', (data: any) => {
			if (data.side == SIDE.LEFT) {
				gameData.player = gameData.p1;
				if (!gameData.player) {
					this.socket.disconnect();
					return;
				}
				gameData.player.setSide(SIDE.LEFT);
			} else if (data.side == SIDE.RIGHT) {
				gameData.player = gameData.p2;
				if (!gameData.player) {
					this.socket.disconnect();
					return;
				}
				gameData.player.setSide(SIDE.RIGHT);
			}
			if (!gameData.player) {
				this.socket.disconnect();
				return;
			}
			gameData.player.update(data.position, data.width, data.height);
		});
	},
};
</script>

<style scoped>
@font-face {
	font-family: 'Arcade_Classic';
	src: url('/fonts/ARCADECLASSIC.TTF');
}

body,
html {
	margin: 0;
	padding: 0;
}

#app {
	margin-top: 60px;
	color: #dddfe2;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	text-align: center;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

#vue-canvas {
	display: block;
	margin: 0 auto;
	padding: 0;
	width: 500px;
	height: 500px;
	border-radius: 20px;
	overflow: hidden;
}

canvas {
	width: 100% !important;
	height: 100px !important;
}
</style>
