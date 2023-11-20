<template>
	<v-container class="d-flex align-center justify-center">
		<div id="app">
<<<<<<< HEAD
<<<<<<< HEAD
			<div v-if="waitingOpp">
				<span class="d-flex align-center justify-center" min-height="100%">
					<h4>Waiting for a opponant</h4>
					<v-progress-circular indeterminate color="deep-purple-accent-2" />
				</span>
			</div>
			<v-card
				:style="{
					backgroundImage: `url(/game/UI/something.gif)`,
					backgroundPosition: 'center center',
					backgroundSize: 'cover',
					flex: '1',
				}"
				class="fill-height versus-container"
			>
			<div class="versus-container-inner">
				<div class="fill-height d-flex align-center no-gutters">
					<div
						:style="{
							backgroundImage: `url(${backgroundLeft})`,
							backgroundPosition: 'center center',
							backgroundSize: 'cover',
							height: '100%',
							flex: '1',
						}"
						class="fill-height d-flex align-center left"
					>
						<div class="d-flex justify-end align-center fill-height">
							<div
								id="leftUser"
								:class="{ tremble: shouldTremble('leftUser') }"
								class="mr-auto fill-height ml-3"
							>
								<v-img class="cadre-responsive" :src="userData.leftPlayer.cadre">
									<h2>{{ userData.leftPlayer.name }}</h2>
									<v-img
										v-if="userData.leftPlayer.relaseEnergy"
										src="/game/UI/releaseEnergy.gif"
										class="release-energy"
									/>
									<v-img
										v-if="userData.leftPlayer.isDead"
										src="/game/UI/cadres/toastDead.gif"
										class="toast-of-death"
									/>
									<v-img
										class="avatar-responsive"
										:class="{ dead: userData.leftPlayer.isDead }"
										:src="userData.leftPlayer.avatar"
									/>
								</v-img>
							</div>
						</div>
					</div>
					<div class="d-flex justify-center align-center fill-height">
						<span class="versus">Versus</span>
					</div>
					<div
						:style="{
							backgroundImage: `url(${backgroundRight})`,
							backgroundPosition: 'center center',
							backgroundSize: 'cover',
							height: '100%',
							flex: '1',
						}"
						class="fill-height d-flex justify-end align-center right"
					>
						<div id="rightUser" :class="{ tremble: shouldTremble('rightUser') }" class="fill-height mr-3">
							<v-img class="cadre-responsive" :src="userData.rightPlayer.cadre">
								<h2>{{ userData.rightPlayer.name }}</h2>
								<v-img
									v-if="userData.rightPlayer.relaseEnergy"
									src="/game/UI/releaseEnergy.gif"
									class="release-energy"
								/>
								<v-img
									v-if="userData.rightPlayer.isDead"
									src="/game/UI/cadres/toastDead.gif"
									class="toast-of-death"
								/>
								<v-img
										class="avatar-responsive"
										:class="{ dead: userData.rightPlayer.isDead }"
										:src="userData.rightPlayer.avatar"
									/>
							</v-img>
						</div>
					</div>
				</div>
				</div>
=======
			<v-card color="transparent" theme="dark">
=======
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
>>>>>>> c7368ae (feat(pong): Front for the Pong)
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
>>>>>>> ef81387 (feat(pong): Start Responsive)
			</v-card>
			<div id="game-canvas" />
	</div>
		<CountdownOverlay v-if="showCountdown" />
	</v-container>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
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
<<<<<<< HEAD
			waitingOpp: true,
=======
>>>>>>> ef81387 (feat(pong): Start Responsive)
			userData: {
				leftPlayer: {
					name: '',
					avatar: '',
<<<<<<< HEAD
					cadre: '/game/UI/cadres/cadre0.png',
					relaseEnergy: false,
					isDead: false,
=======
>>>>>>> ef81387 (feat(pong): Start Responsive)
				},
				rightPlayer: {
					name: 'AI',
					avatar: 'https://cdn-icons-png.flaticon.com/512/4529/4529980.png',
<<<<<<< HEAD
					cadre: '/game/UI/cadres/cadre0.png',
					relaseEnergy: false,
					isDead: false,
				},
			},
			backgroundLeft: '',
			backgroundRight: '',
			trembleState: {
				leftUser: false,
				rightUser: false,
			},
=======
				},
			},
			background: '',
		};
	},
	beforeMount() {
		this.userData.leftPlayer = {
			name: this.user.displayName,
			avatar: this.user.avatar,
>>>>>>> ef81387 (feat(pong): Start Responsive)
		};
		const backgroundList: string[] = [];
		const images = import.meta.glob('/public/game/battleParallax/*.png');
		console.log(images);
		for (const path in images) {
			backgroundList.push(path);
		}
		this.background = backgroundList[Math.floor(Math.random() * backgroundList.length)];
	},
	beforeMount() {
		this.userData.leftPlayer = {
			name: this.user.displayName,
			avatar: this.user.avatar,
			cadre: '/game/UI/cadres/cadre0.png',
		};
		const backgroundList: string[] = [];
		const images = import.meta.glob('/public/game/battleParallax/*.*');
		for (const path in images) {
			backgroundList.push(path);
		}
		this.backgroundLeft = backgroundList[Math.floor(Math.random() * backgroundList.length)];
		this.backgroundLeft = this.backgroundLeft.replace('/public', '');
		this.backgroundRight = backgroundList[Math.floor(Math.random() * backgroundList.length)];
		this.backgroundRight = this.backgroundRight.replace('/public', '');
		console.log(this.backgroundLeft);
		console.log(this.backgroundRight);
	},
	async mounted() {
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
			waiting: false as boolean,
		};
		const componentRef = ref(this);

		const p5jsReadyPromise = new Promise((resolve) => {
			const script = async function (p5: any) {
				const cDiv = document.getElementById('game-canvas');
				const textOffsetX: number = 50;
				const textOffsetY: number = 10;
				let width: number,
					height: number,
					retroFont: string,
					ballLeft: P5.Image,
					ballRight: P5.Image,
					ball: P5.Image;

				p5.preload = () => {
					retroFont = p5.loadFont('/fonts/ARCADECLASSIC.TTF');
					ball = p5.loadImage('/game/UI/balls/ball.png');
					ballLeft = p5.loadImage('/game/UI/balls/ball-left.png');
					ballRight = p5.loadImage('/game/UI/balls/ball-right.png');
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
					if (!gameData.start) gameData.go = true;
					resolve(true);
				};

				p5.draw = () => {
					p5.clear();
					movePaddles();
					backdrop();
					if (!gameData.leftUser || !gameData.rightUser || !gameData.ball) return;
					const oob = gameData.ball.outOfBounds();
					if (oob) {
						if (oob == 'right') {
							gameData.leftUser.score++;
							componentRef.value.startTremble('rightUser');
						} else {
							gameData.rightUser.score++;
							componentRef.value.startTremble('leftUser');
						}
					}
					if (gameData.go && !gameData.waiting) gameData.ball.update();
					if (!gameData.start && gameData.go) rightPaddleAI();
					gameData.ball.hit(gameData.leftUser, gameData.rightUser);
					gameData.leftUser.show();
					gameData.rightUser.show();
					gameData.ball.show(ball, ballLeft, ballRight, gameData.waiting);
				};

				/**
				 * Function for moving the right Paddle.
				 */
				function rightPaddleAI() {
					if (!gameData.ball || !gameData.rightUser) return;
					if (gameData.start) return;

					const halfWidth = width / 2;
					if (gameData.ball.vel.x < 0) return;

					if (gameData.ball.pos.x < halfWidth) return;
					if (gameData.ball.pos.y < gameData.rightUser.pos.y + gameData.rightUser.h / 2) {
						gameData.rightUser.move(-4.5);
					}
					if (gameData.ball.pos.y > gameData.rightUser.pos.y + gameData.rightUser.h / 2) {
						gameData.rightUser.move(4.5);
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
					if (!gameData.go) return;
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

<<<<<<< HEAD
			new P5(script);
		});
		this.socket.on('game-start', async (data: any) => {
			await p5jsReadyPromise;
			this.waitingOpp = false;
=======
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

<<<<<<< HEAD
		this.socket.on('game-start', () => {
>>>>>>> ef81387 (feat(pong): Start Responsive)
			gameData.socket = this.socket;
			gameData.go = false;
			gameData.waiting = true;
			gameData.ball?.resetball();
			if (!gameData.leftUser || !gameData.rightUser) return this.$router.push({ name: 'GameCreator' });
			if (gameData.leftUser) gameData.leftUser.score = 0;
			if (gameData.rightUser) gameData.rightUser.score = 0;
			if (data.leftUser) {
				console.log(data.leftUser);
				this.userData.leftPlayer = {
					name: data.leftUser.displayName,
					avatar: data.leftUser.avatar,
					cadre: '/game/UI/cadres/cadre0.png',
				};
				gameData.leftUser.setUser(data.leftUser.displayName, data.leftUser.avatar);
			}
			if (data.rightUser) {
				this.userData.rightPlayer = {
					name: data.rightUser.displayName,
					avatar: data.rightUser.avatar,
					cadre: '/game/UI/cadres/cadre0.png',
				};
				gameData.rightUser.setUser(data.rightUser.displayName, data.rightUser.avatar);
=======
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
>>>>>>> 3afc756 (feat(pong): Continue responsivity)
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
				gameData.start = true;
				gameData.go = true;
				gameData.waiting = false;
				this.showCountdown = false;
			}
		});

<<<<<<< HEAD
		this.socket.on('player-side', async (data: any) => {
			await p5jsReadyPromise;
=======
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
>>>>>>> ef81387 (feat(pong): Start Responsive)
			if (data.side == SIDE.LEFT) {
				gameData.player = gameData.leftUser;
				if (!gameData.player) {
					this.socket.disconnect();
					console.error('Player is null');
<<<<<<< HEAD
					return this.$router.push({ name: 'GameCreator' });
=======
					return;
>>>>>>> ef81387 (feat(pong): Start Responsive)
				}
				gameData.player.setSide(SIDE.LEFT);
			} else if (data.side == SIDE.RIGHT) {
				gameData.player = gameData.rightUser;
				if (!gameData.player) {
					this.socket.disconnect();
					console.error('Player is null');
<<<<<<< HEAD
					return this.$router.push({ name: 'GameCreator' });
=======
					return;
>>>>>>> ef81387 (feat(pong): Start Responsive)
				}
				gameData.player.setSide(SIDE.RIGHT);
			}
			if (!gameData.player) {
				this.socket.disconnect();
				console.error('Player is null');
<<<<<<< HEAD
				return this.$router.push({ name: 'GameCreator' });
=======
				return;
>>>>>>> ef81387 (feat(pong): Start Responsive)
			}
			console.log(data);
			gameData.player.update(data.position);
		});

		this.socket.on('game-update', (data: any) => {
			gameData.ball?.serverUpdate(data.position, data.velocity, data.speed);
			gameData.waiting = false;
		});

		this.socket.on('player-moved', (data: any) => {
			if (data.leftUser) gameData.leftUser?.update(data.leftUser.position);
			if (data.rightUser) gameData.rightUser?.update(data.rightUser.position);
		});

		this.socket.on('game-score', (data: any) => {
			if (!gameData.leftUser || !gameData.rightUser) return;
			if (data.leftUser > gameData.leftUser.getPoint()) this.startTremble('rightUser');
			if (data.rightUser > gameData.rightUser.getPoint()) this.startTremble('leftUser');
			gameData.leftUser.setPoint(data.leftUser);
			gameData.rightUser.setPoint(data.rightUser);
			if (data.leftUser <= 5 && data.rightUser <= 5) {
				this.userData.leftPlayer.cadre = `/game/UI/cadres/cadre${gameData.rightUser.score}.png`;
				this.userData.rightPlayer.cadre = `/game/UI/cadres/cadre${gameData.leftUser.score}.png`;
			} else if (data.leftUser >= 6 || data.rightUser >= 6) {
				if (data.leftUser >= 6 && data.rightUser < 6) this.dead('rightPlayer');
				else if (data.leftUser < 6 && data.rightUser >= 6) this.dead('leftPlayer');
			}
			gameData.waiting = true;
		});

		this.socket.on('game-end', (data: any) => {
			gameData.go = false;
			if (!gameData.leftUser || !gameData.rightUser) return;
			console.log(data);
			if (data.loser.side == SIDE.LEFT) {
				gameData.leftUser.setPoint(data.loser.score);
				if (!this.userData['leftPlayer'].relaseEnergy) this.dead('leftPlayer');
				else this.userData['leftPlayer'].dead = true;
			} else {
				gameData.rightUser.setPoint(data.loser.score);
				if (!this.userData['rightPlayer'].relaseEnergy) this.dead('rightPlayer');
				else this.userData['rightPlayer'].dead = true;
			}
			if (data.winner.side == SIDE.LEFT) {
				gameData.leftUser.setPoint(data.winner.score);
			} else {
				gameData.rightUser.setPoint(data.winner.score);
			}
		});
	},
	methods: {
		shouldTremble(user: string) {
			return this.trembleState[user];
		},
		startTremble(user: string) {
			this.trembleState[user] = true;
			setTimeout(() => {
				this.stopTremble(user);
			}, 800);
		},
		stopTremble(user: string) {
			this.trembleState[user] = false;
		},
		dead(user: string) {
			this.userData[user].relaseEnergy = true;
			setTimeout(() => {
				this.userData[user].relaseEnergy = false;
				this.userData[user].isDead = true;
				this.userData[user].cadre = '/game/UI/cadres/cadre6.png';
				console.log(this.userData[user].isDead);
			}, 9000);
		},
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

.fill-height {
	overflow: hidden;
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

#game-canvas {
	background-color: transparent;
	backdrop-filter: blur(5px);
	width: 69vw;
	height: 61.2vh;
	border: 5px solid #b78846;
	border-top: 0;
	border-radius: 5px;
	box-shadow: 0px 0px 5px #b78846;
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

<<<<<<< HEAD
.cadre-responsive {
	width: 6vw;
	height: 8vw;
}

.avatar-responsive {
	width: 6vw;
	height: 7vw;
	z-index: -999;
}

.release-energy {
	width: 6vw;
	height: 7vw;
	position: absolute;
	z-index: -888;
}

.toast-of-death {
	width: 6vw;
	height: 7vw;
	position: absolute;
	z-index: -888;
}
.dead {
	filter: grayscale(100%);
=======
.avatar-responsive {
	width: 5vw;
	height: 5vw;
>>>>>>> ef81387 (feat(pong): Start Responsive)
}

.align-center {
	align-items: center;
}

<<<<<<< HEAD
.versus {
	font-family: 'OMORI_DISTURBED', sans-serif;
	font-size: 4.5vw;
=======
h1 {
	font-family: 'OMORI_DISTURBED';
<<<<<<< HEAD
	font-size: 3.5vw;
>>>>>>> ef81387 (feat(pong): Start Responsive)
=======
	font-size: 4.5vw;
>>>>>>> c7368ae (feat(pong): Front for the Pong)
	text-align: center;
	color: white;
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
<<<<<<< HEAD
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	z-index: 99999;
}

.right {
	z-index: -666;
	width: 100%;
	clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
}

.left {
	z-index: -777;
	clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
}

h2 {
	font-family: 'OMORI_MAIN', sans-serif;
	margin-top: 0.8vw;
	font-size: 1.5vw;
	text-align: center;
	color: white;
	line-height: 0px;
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
}

h4 {
	font-family: 'OMORI_MAIN', sans-serif;
	padding: 10px;
	font-size: 1.8vw;
	text-align: center;
	color: white;
	line-height: 1;
=======
	margin: auto;
}

h2 {
	font-family: 'OMORI_MAIN';
	font-size: xx-large;
	text-align: center;
	color: white;
>>>>>>> ef81387 (feat(pong): Start Responsive)
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
<<<<<<< HEAD
=======
	margin: auto;
>>>>>>> ef81387 (feat(pong): Start Responsive)
}

canvas {
	width: 100% !important;
	height: 100px !important;
	background-color: rgba(172, 11, 11, 0.4);
}

.blurred-card {
	padding: 16px;
<<<<<<< HEAD
}

.tremble {
	animation: tremble 0.5s ease-in-out infinite;
}

.tremble .avatar-responsive {
	filter: invert(21%) sepia(100%) saturate(1900%) hue-rotate(359deg) brightness(94%) contrast(117%);
}

@keyframes tremble {
	0% {
		transform: translate(0, 0);
	}
	25% {
		transform: translate(-2px, -2px);
	}
	50% {
		transform: translate(2px, 2px);
	}
	75% {
		transform: translate(-2px, 2px);
	}
	100% {
		transform: translate(2px, -2px);
	}
}

.versus-container {
	position: relative;
	width: 100%;
	height: 100%;
	padding: 5px;
	overflow: hidden;
	border: 2px solid #b78846;
	background-color: rgba(0, 0, 0, 0.5);
}

 .versus-container:before, .versus-container:after {
	content: "•";
	position: absolute;
	width: 14px;
	height: 14px;
	font-size: 14px;
	color: #b78846;
	border: 2px solid #b78846;
	line-height: 12px;
	top: 5px;
	text-align: center;
}
 .versus-container:before {
	 left: 5px;
}
 .versus-container:after {
	 right: 5px;
}
 .versus-container .versus-container-inner {
	 position: relative;
	 border: 2px solid #b78846;
}
 .versus-container .versus-container-inner:before, .versus-container .versus-container-inner:after {
	 content: "•";
	 position: absolute;
	 width: 14px;
	 height: 14px;
	 font-size: 14px;
	 color: #b78846;
	 border: 2px solid #b78846;
	 line-height: 12px;
	 bottom: -2px;
	 text-align: center;
}
 .versus-container .versus-container-inner:before {
	 left: -2px;
}
 .versus-container .versus-container-inner:after {
	 right: -2px;
=======
	border: 10px double #dddfe2;
>>>>>>> c7368ae (feat(pong): Front for the Pong)
}
</style>
