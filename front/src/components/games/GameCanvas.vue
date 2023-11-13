<template>
	<v-container>
		<div id="app">
			<div id="game-canvas" />
		</div>
		<CountdownOverlay v-if="showCountdown" />
	</v-container>
</template>

<script lang="ts">
import { computed, ref } from 'vue';

import P5 from 'p5';

import { Ball } from '../../services/Ball';
import { Paddle } from '../../services/Paddle';
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
			go: false,
			p1: null as Paddle | null,
			p2: null as Paddle | null,
			ball: null as Ball | null,
		};
		const script = function (p5: any) {
			let textOffsetX: number = 50;
			let textOffsetY: number = 10;

			p5.setup = () => {
				const canvas = p5.createCanvas(1200, 900);
				canvas.parent('game-canvas');
				gameData.ball = new Ball(p5, p5.width / 2, p5.height / 2, 10, 10);
				gameData.p1 = new Paddle(p5, 20, p5.height / 2 - 50, 10, 100);
				gameData.p2 = new Paddle(p5, p5.width - 30, p5.height / 2 - 50, 10, 100);
			};
			p5.draw = () => {
				p5.background(51);
				backdrop();
				movePaddles();
				if (!gameData.p1 || !gameData.p2 || !gameData.ball) return;
				gameData.p1.show();
				gameData.p2.show();

				let oob = gameData.ball.outOfBounds();
				if (oob) {
					// the ball stays at spawn till go = true
					gameData.go = false;
					if (oob == 'right') {
						gameData.p1.score++;
					} else {
						gameData.p2.score++;
					}
					setTimeout(() => {
						gameData.go = true;
					}, 1000);
				}

				if (gameData.go) gameData.ball.update();
				gameData.ball.hit(gameData.p1, gameData.p2);
				gameData.ball.show();
			};

			/**
			 * Function for moving the player Paddle.
			 */
			function movePaddles() {
				if (!gameData.p1 || !gameData.p2 || !gameData.ball || !gameData.go) return;
				// 65 = 'a'
				if (p5.keyIsDown(65)) {
					gameData.p1.move(-5);
				}

				// 90 = 'z'
				if (p5.keyIsDown(90)) {
					gameData.p1.move(5);
				}
			}

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

				p5.textSize(100);
				p5.noStroke();
				p5.fill(80);

				p5.textAlign(p5.RIGHT, p5.TOP);
				p5.text(gameData.p1.score, p5.width / 2 - textOffsetX, textOffsetY);

				p5.textAlign(p5.LEFT);
				p5.text(gameData.p2.score, p5.width / 2 + textOffsetX, textOffsetY);
			}

			/**
			 * Function for moving the player Paddle.
			 */
			p5.keyTyped = () => {
				if (!gameData.p1 || !gameData.p2 || !gameData.ball) return;
				if (p5.key == ' ') {
					gameData.go = true;
				}

				if (p5.key == 'r') {
					gameData.p1.score = 0;
					gameData.p2.score = 0;
					gameData.ball.resetball();
					gameData.go = false;
				}

				// for safety
				return false;
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
				setTimeout(() => {
					gameData.go = true;
				}, 1000);
			}
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
