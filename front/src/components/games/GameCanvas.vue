<template>
	<v-container class="d-flex align-center justify-center">
		<div id="app">
			<v-card
				color="transparent"
				theme="dark"
				class="blurred-card"
				:style="{
					backgroundImage: `url(${background})`,
					backgroundPosition: 'center center',
					backgroundSize: 'cover',
				}"
			>
				<div class="d-flex justify-space-between align-center">
					<div class="mr-auto">
						<v-avatar class="avatar-responsive">
							<v-img :src="userData.leftPlayer.avatar" />
						</v-avatar>
						<h2>{{ userData.leftPlayer.name }}</h2>
					</div>
					<div>
						<h1>Versus</h1>
					</div>
					<div class="ml-auto">
						<v-avatar class="avatar-responsive">
							<v-img :src="userData.rightPlayer.avatar" />
						</v-avatar>
						<h2>{{ userData.rightPlayer.name }}</h2>
					</div>
				</div>
			</v-card>
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
import { useUser } from '../../stores/user';
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
		const userStore = useUser();

		const isConnected = computed(() => webSocketStore.isConnected);
		const socket = computed(() => webSocketStore.getSocket);
		const user = computed(() => userStore.getUser);
		const JWT = computed(() => userStore.getJWT);

		return {
			isConnected,
			socket,
			user,
			JWT,
		};
	},
	data() {
		return {
			showCountdown: false,
			userData: {
				leftPlayer: {
					name: '',
					avatar: '',
				},
				rightPlayer: {
					name: 'AI',
					avatar: 'https://cdn-icons-png.flaticon.com/512/4529/4529980.png',
				},
			},
			background: '',
		};
	},
	beforeMount() {
		this.userData.leftPlayer = {
			name: this.user.displayName,
			avatar: this.user.avatar,
		};
		const backgroundList: string[] = [];
		const images = import.meta.glob('/public/game/battleParallax/*.png');
		console.log(images);
		for (const path in images) {
			backgroundList.push(path);
		}
		this.background = backgroundList[Math.floor(Math.random() * backgroundList.length)];
	},
	mounted() {
		const route = useRoute();
		const gameData = {
			start: false as boolean,
			go: false as boolean,
			user: this.user as any,
			leftUser: null as Paddle | null,
			rightUser: null as Paddle | null,
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
				height = cDiv.offsetHeight;
				const canvas = p5.createCanvas(width, height);
				canvas.parent('game-canvas');

				gameData.ball = new Ball(p5, width / 2, height / 2, 10);
				gameData.leftUser = new Paddle(p5, 20, height / 2 - 50, 10, height / 4, SIDE.LEFT);
				gameData.leftUser.setUser(gameData.user.displayName, gameData.user.avatar);
				gameData.rightUser = new Paddle(p5, width - 30, height / 2 - 50, 10, height / 4, SIDE.RIGHT);
				gameData.go = true;
			};

			p5.draw = () => {
				p5.clear();
				movePaddles();
				backdrop();
				if (!gameData.leftUser || !gameData.rightUser || !gameData.ball) return;
				const oob = gameData.ball.outOfBounds();
				if (oob) {
					if (oob == 'right') gameData.leftUser.score++;
					else gameData.rightUser.score++;
				}
				if (gameData.go) gameData.ball.update();
				if (!gameData.start && gameData.go) rightPaddleAI();
				gameData.ball.hit(gameData.leftUser, gameData.rightUser);
				gameData.leftUser.show();
				gameData.rightUser.show();
				gameData.ball.show();
			};

			/**
			 * Function for moving the right Paddle.
			 */
			function rightPaddleAI() {
				if (!gameData.ball || !gameData.rightUser) return;

				const halfWidth = width / 2;

				if (gameData.ball.pos.x < halfWidth) return;
				if (gameData.ball.pos.y < gameData.rightUser.pos.y + gameData.rightUser.h / 2) {
					gameData.rightUser.move(-4);
				}
				if (gameData.ball.pos.y > gameData.rightUser.pos.y + gameData.rightUser.h / 2) {
					gameData.rightUser.move(4);
				}
			}

			/**
			 * Function for write score and drawing line in the center.
			 */
			function backdrop() {
				if (!gameData.leftUser || !gameData.rightUser) return;
				p5.stroke(255);
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
				p5.fill(255);

				p5.textAlign(p5.RIGHT, p5.TOP);
				p5.text(gameData.leftUser.score, width / 2 - textOffsetX, textOffsetY);

				p5.textAlign(p5.LEFT);
				p5.text(gameData.rightUser.score, width / 2 + textOffsetX, textOffsetY);
			}

			p5.windowResized = () => {
				if (!cDiv || !gameData.ball || !gameData.leftUser || !gameData.rightUser) return;
				const oldWidth: number = width;
				const oldHeight: number = height;
				width = cDiv.offsetWidth;
				height = cDiv.offsetHeight;
				p5.resizeCanvas(width, height);
				gameData.ball.resizeUpdate(width, height, oldWidth, oldHeight);
				gameData.leftUser.resizeUpdate(height, width, oldWidth, oldHeight);
				gameData.rightUser.resizeUpdate(height, width, oldWidth, oldHeight);
			};

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
				if (!gameData.ball || !gameData.leftUser || gameData.start) return;
				if (p5.keyIsDown(87)) {
					gameData.leftUser.move(-5);
				}

				if (p5.keyIsDown(83)) {
					gameData.leftUser.move(5);
				}
			}
		};
		new P5(script);

		this.socket.on('game-start', (data: any) => {
			gameData.socket = this.socket;
			if (data.leftUser) {
				this.userData.leftPlayer = {
					name: data.leftUser.name,
					avatar: data.leftUser.avatar,
				};
			}
			if (data.rightUser) {
				this.userData.rightPlayer = {
					name: data.rightUser.name,
					avatar: data.rightUser.avatar,
				};
			}
			if (gameData.leftUser) gameData.leftUser.score = 0;
			if (gameData.rightUser) gameData.rightUser.score = 0;
			countdownStore.setSeconds(5);
			this.showCountdown = true;
			gameData.go = false;
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
			if (data.leftUser)
				gameData.leftUser?.update(data.leftUser.position, data.leftUser.width, data.leftUser.height);
			if (data.rightUser)
				gameData.rightUser?.update(data.rightUser.position, data.rightUser.width, data.rightUser.height);
		});

		this.socket.on('game-score', (data: any) => {
			gameData.leftUser?.setPoint(data.leftUser);
			gameData.rightUser?.setPoint(data.rightUser);
		});

		this.socket.on('player-side', (data: any) => {
			if (data.side == SIDE.LEFT) {
				gameData.player = gameData.leftUser;
				if (!gameData.player) {
					this.socket.disconnect();
					console.error('Player is null');
					return;
				}
				gameData.player.setSide(SIDE.LEFT);
			} else if (data.side == SIDE.RIGHT) {
				gameData.player = gameData.rightUser;
				if (!gameData.player) {
					this.socket.disconnect();
					console.error('Player is null');
					return;
				}
				gameData.player.setSide(SIDE.RIGHT);
			}
			if (!gameData.player) {
				this.socket.disconnect();
				console.error('Player is null');
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

@font-face {
	font-family: 'OMORI_MAIN';
	src: url('/fonts/OMORI_GAME.ttf') format('truetype-variations');
}

@font-face {
	font-family: 'OMORI_DISTURBED';
	src: url('/fonts/OMORI_GAME2.ttf') format('truetype-variations');
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
	width: 80vw;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	border: 10px double #dddfe2;
}

#game-canvas {
	background-color: transparent;
	backdrop-filter: blur(5px);
	width: 79vw;
	height: 61.2vh;
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

.avatar-responsive {
	width: 5vw;
	height: 5vw;
}

.align-center {
	align-items: center;
}

h1 {
	font-family: 'OMORI_DISTURBED';
	font-size: 4.5vw;
	text-align: center;
	color: white;
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
	margin: auto;
}

h2 {
	font-family: 'OMORI_MAIN';
	font-size: xx-large;
	text-align: center;
	color: white;
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
	margin: auto;
}

canvas {
	width: 100% !important;
	height: 100px !important;
	background-color: rgba(172, 11, 11, 0.4);
}

.blurred-card {
	padding: 16px;
	border: 10px double #dddfe2;
}
</style>
