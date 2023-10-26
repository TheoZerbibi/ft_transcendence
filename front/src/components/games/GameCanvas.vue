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

import P5 from 'p5';

import { Ball } from '../../services/Ball';
import { Paddle } from '../../services/Paddle';
import { SIDE } from '../../services/enums/Side';
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
		const gameData = {
			start: false as boolean,
			go: false as boolean,
			p1: null as Paddle | null,
			p2: null as Paddle | null,
			ball: null as Ball | null,
			ratio: (9 / 20) as number,
		};
		const script = function (p5: any) {
			const cDiv = document.getElementById('game-canvas');
			const textOffsetX: number = 50;
			const textOffsetY: number = 10;
			const ratio: number = gameData.ratio;
			let width: number, height: number;

			p5.setup = () => {
				if (!cDiv) return;
				width = cDiv.offsetWidth;
				height = ratio * cDiv.offsetWidth;
				console.log(width, height);
				const canvas = p5.createCanvas(width, height);
				canvas.parent('game-canvas');

				gameData.ball = new Ball(p5, width / 2, height / 2, ratio);
				gameData.p1 = new Paddle(p5, width / 75, ratio);
				gameData.p2 = new Paddle(p5, width - (width / 75) * 2, ratio);
			};
			p5.draw = () => {
				p5.background(51);
				movePaddles();
				backdrop();
				if (!gameData.p1 || !gameData.p2 || !gameData.ball) return;
				gameData.p1.show();
				gameData.p2.show();
				gameData.ball.show();
			};

			/**
			 * Function for moving the player Paddle.
			 */
			function backdrop() {
				if (!gameData.p1 || !gameData.p2) return;
				p5.stroke(80);
				p5.strokeWeight(8);

				let dottedLength = 20;

				let y = dottedLength / 2;

				while (y < p5.height) {
					p5.line(p5.width / 2, y, p5.width / 2, y + dottedLength);
					y += dottedLength * 2;
				}

				const _r = width / 1736;
				const _size = 100 * _r;
				p5.textSize(_size);
				p5.noStroke();
				p5.fill(80);

				p5.textAlign(p5.RIGHT, p5.TOP);
				p5.text(gameData.p1.score, width / 2 - textOffsetX, textOffsetY);

				p5.textAlign(p5.LEFT);
				p5.text(gameData.p2.score, width / 2 + textOffsetX, textOffsetY);
			}

			/**
			 * Function for moving the player Paddle.
			 */
			function movePaddles() {
				if (!gameData.p1 || !gameData.p2 || !gameData.ball) return;
				// 65 = 'a'
				if (p5.keyIsDown(65)) {
					gameData.p1.move(-5);
				}

				// 90 = 'z'
				if (p5.keyIsDown(90)) {
					gameData.p1.move(5);
				}
			}

			p5.windowResized = () => {
				if (!cDiv || !gameData.ball || !gameData.p1 || !gameData.p2) return;
				const oldWidth: number = width;
				const oldHeight: number = height;
				width = cDiv.offsetWidth;
				height = ratio * cDiv.offsetWidth;
				p5.resizeCanvas(width, height);
				gameData.ball.resizeUpdate(ratio, width, height, oldWidth, oldHeight);
				gameData.p1.resizeUpdate(ratio, width, oldWidth, oldHeight);
				gameData.p2.resizeUpdate(ratio, width, oldWidth, oldHeight);
			};
		};
		new P5(script);

		this.socket.on('game_start', (data: any) => {
			console.log('game_start');
			countdownStore.setSeconds(5);
			this.showCountdown = true;
			console.log('Données reçues du canal game_start :', data);
		});

		this.socket.on('countdown', (data: number) => {
			console.log('countdown');
			console.log(data);
			countdownStore.setSeconds(data);
			if (data <= 0) {
				this.showCountdown = false;
				gameData.start = true;
				setTimeout(() => {
					gameData.go = true;
				}, 1000);
			}
		});

		this.socket.on('game_update', (data: any) => {
			// console.log('Données reçues du canal game_update :', data);
			gameData.ball?.update(data.position, data.velocity, data.speed, data.radius);
			gameData.ratio = data.ratio;
		});

		this.socket.on('player_moove', (data: any) => {
			gameData.p1?.update(data.p1Position);
			gameData.p2?.update(data.p2Position);
		});

		this.socket.on('new_point', (data: any) => {
			if (data == SIDE.LEFT) {
				gameData.p1?.addPoint();
			} else if (data == SIDE.RIGHT) {
				gameData.p2?.addPoint();
			}
			console.log(data);
		});
	},
};
</script>

<style scoped>
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
</style>
