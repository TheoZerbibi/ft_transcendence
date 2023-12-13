<template>
	<main>
		<div
			v-if="apiData"
			:style="{
				backgroundImage: `url(${background})`,
				backgroundPosition: 'center center',
				backgroundSize: 'cover',
			}"
			class="game-container d-flex align-center justify-center"
		>
			<div v-if="waitingStart" class="d-flex align-center justify-center game-opponent-overlay">
				<GameOpponent :leftPlayer="leftPlayer" :rightPlayer="rightPlayer" />
			</div>
			<div>
				<GameCanvas :gameEnded="gameEnded" :gameUID="gameUID" />
				<span class="d-flex justify-center align-center ga-10">
					<span class="d-flex justify-center ga-1">
						<img height="50" width="50" src="/game/keys/W_KEY.gif" />
						<h4 class="ml-2">UP</h4>
					</span>
					<span class="d-flex justify-center ga-1">
						<img height="50" width="50" src="/game/keys/S_KEY.gif" />
						<h4 class="ml-2">DOWN</h4>
					</span>
				</span>
			</div>
		</div>
		<GameModal
			v-if="dialogVisible"
			:isVisible="dialogVisible"
			:isWinner="isWinner"
			:isLoser="isLoser"
			:apiData="apiData"
		/>
		<v-btn color="primary" @click="openDialog">Open Dialog</v-btn>
		<Snackbar />
	</main>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useSnackbarStore } from '../../stores/snackbar';
import { useUser } from '../../stores/user';
import { useSocketStore } from '../../stores/websocket';
import Snackbar from '../layout/Snackbar.vue';
import GameModal from '../utils/GameModal.vue';

import GameCanvas from './GameCanvas.vue';
import GameOpponent from './GameOpponent.vue';

const snackbarStore = useSnackbarStore();

export default {
	name: 'PongGame',
	components: { Snackbar, GameCanvas, GameModal, GameOpponent },
	setup() {
		const webSocketStore = useSocketStore();
		const userStore = useUser();

		const isConnected = computed(() => webSocketStore.isConnected);
		const socket = computed(() => webSocketStore.getSocket);
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		const connect = async (JWT: string) => {
			await webSocketStore.connect(JWT, import.meta.env.VITE_GAME_SOCKET_PORT);
		};

		const disconnect = () => {
			webSocketStore.disconnect();
		};

		const socketListen = () => {
			if (socket.value) {
				socket.value.on('game-error', (data: any) => {
					disconnect();
					snackbarStore.showSnackbar(data, 3000, 'red');
				});
			}
		};
		return {
			isConnected,
			socket,
			connect,
			disconnect,
			socketListen,
			JWT,
			user,
		};
	},
	data() {
		return {
			gameEnded: false as boolean,
			apiData: null as any,
			gameUID: undefined as string | undefined,
			players: [] as any[],
			background: null as any,
			dialogVisible: false as boolean,
			isWinner: false as boolean,
			isLoser: false as boolean,
			waitingStart: false as boolean,
			leftPlayer: {
				id: 0,
				login: '',
				displayName: '',
				avatar: '',
			},
			rightPlayer: {
				id: 0,
				login: '',
				displayName: '',
				avatar: '',
			},
		};
	},
	async beforeUnmount() {
		if (this.isConnected) {
			this.disconnect();
		}
		if (snackbarStore.snackbar) snackbarStore.hideSnackbar();
	},
	async beforeMount() {
		const route = useRoute();
		this.gameUID = route.params.uid;
		if (!this.gameUID) return;
		snackbarStore.hideSnackbar();

		const backgroundList: string[] = [];
		const images = import.meta.glob('/public/game/battleBackground/*.png');
		for (const path in images) {
			backgroundList.push(path);
		}
		this.background = backgroundList[Math.floor(Math.random() * backgroundList.length)];
		this.background = this.background.replace('/public', '');

		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.JWT}`,
				'Access-Control-Allow-Origin': '*',
			},
		};
		// eslint-disable-next-line no-undef
		await fetch(
			`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/game/${this.gameUID}`,
			requestOptions,
		)
			.then(async (response) => {
				if (!response.ok) {
					const data = await response.json();
					snackbarStore.showSnackbar(data.message, 3000, 'red');
					throw new Error(data.message);
				}
				return response.json();
			})
			.then(async (data) => {
				if (data.isEnded) {
					snackbarStore.showSnackbar('Game is ended', 3000);
					this.gameEnded = true;
					this.dialogVisible = true;
					if (data.winner.login === this.user.login) this.isWinner = true;
					else this.isLoser = true;
					setTimeout(() => {
						this.apiData = data;
					}, 100);
					return;
				} else {
					await this.connect(this.JWT, import.meta.env.VITE_GAME_SOCKET_PORT)
						.then(() => {
							this.socketListen();
							this.socket.on('session-info', (data: any) => {
								this.players = [];
								for (let i = 0; i < data.length; i++) {
									data[i].user.isSpec = data[i].isSpec;
									if (data[i].user) this.players.push(data[i].user);
								}
							});

							this.socket.on('waiting-start', (data: any) => {
								this.leftPlayer = data.leftUser;
								this.rightPlayer = data.rightUser;
								this.waitingStart = true;
							});

							this.socket.on('cancel-waiting', () => {
								this.waitingStart = false;
								this.leftPlayer = null;
								this.rightPlayer = null;
								snackbarStore.showSnackbar('Your opponent has left the game', 3000);
								this.disconnect();
								this.$router.push({ name: 'GameMenu' });
							});

							this.socket.on('game-start', (data: any) => {
								this.waitingStart = false;
								snackbarStore.showSnackbar('Game Starting !', 3000, 'green');
								this.apiData.started_at = data.startDate;
							});

							this.socket.on('game-end', (data: any) => {
								this.disconnect();
								if (!snackbarStore.snackbar) snackbarStore.showSnackbar('Game is ended', 3000);
								this.dialogVisible = true;
								setTimeout(() => {
									this.apiData = data;
									this.gameEnded = true;
								}, 8800);
							});

							this.socket.on('game-win', () => {
								this.isWinner = true;
								snackbarStore.showSnackbar('You win!', 3000, 'green');
							});

							this.socket.on('game-lose', () => {
								this.isLoser = true;
								snackbarStore.showSnackbar('You lose!', 3000, 'red');
							});
							this.socket.on('error', (data: any) => {
								snackbarStore.showSnackbar(data.message, 3000, 'red');
							});

							this.socket.emit('session-join', {
								gameUID: this.gameUID,
								userID: data.player_id,
								isSpec: data.is_spec,
							});
						})
						.catch((error: any) => {
							snackbarStore.showSnackbar(error, 3000, 'red');
							return;
						});
					this.apiData = data;
					if (data.isSpec) snackbarStore.showSnackbar('Connecting to the game session.', 3000, 'orange');
					else snackbarStore.showSnackbar('Joining game session.', 3000, 'green');
				}
			})
			.catch((error) => {
				snackbarStore.showSnackbar(error, 3000, 'red');
			});
	},
	methods: {
		openDialog() {
			console.log('openDialog');
			this.gameEnded = true;
			this.isLoser = true;
			if (!snackbarStore.snackbar) snackbarStore.showSnackbar('Game is ended', 3000);
			this.dialogVisible = true;
			setTimeout(() => {
				this.gameEnded = true;
				this.apiData = {
					winner: {
						user: {
							id: 2,
							login: 'norminet',
							displayName: 'Norminet',
							avatar: 'https://preview.redd.it/sky2ka084ns11.jpg?width=640&crop=smart&auto=webp&s=a7f060f539797578a109af48a5ee75909f7661cb',
						},
						score: 6,
						side: 1,
					},
					loser: {
						user: {
							id: 1,
							login: 'thzeribi',
							displayName: 'Theo',
							avatar: 'https://i.imgur.com/XXxzteU.png',
						},
						score: 1,
						side: 0,
					},
					startDate: '2023-11-20T12:00:38.537Z',
					endingDate: '2023-11-20T12:01:24.445Z',
				};
			}, 100);
		},
	},
};
</script>
<style scoped>
.game-container {
	position: relative;
	width: 100vw;
	height: 100vh;
}

.game-opponent-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10; /* Une valeur élevée pour être au-dessus des autres contenus */
	background-color: rgba(0, 0, 0, 0.5); /* Optionnel: fond semi-transparent */
	display: flex;
	justify-content: center;
	align-items: center;
}

h4 {
	font-family: 'OMORI_MAIN', sans-serif;
	font-size: xx-large;
	text-align: center;
	color: rgb(65, 37, 37);
	text-shadow:
		1px 1px 2px plum,
		0 0 1em rgb(255, 123, 255),
		0 0 0.2em rgb(255, 255, 255);
}

.container {
	overflow: hidden;
	height: 100vh;
}
</style>
