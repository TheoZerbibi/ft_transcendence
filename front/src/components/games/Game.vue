<template>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
	<main>
		<div
			v-if="apiData"
			:style="{
				backgroundImage: `url(${background})`,
				backgroundPosition: 'center center',
				backgroundSize: 'cover',
			}"
			class="container d-flex align-center justify-center"
		>
<<<<<<< HEAD
<<<<<<< HEAD
			<div>
=======
	<v-container>
		<div v-if="apiData">
			<!-- <v-card color="#1d2028" class="mx-auto" max-width="500">
=======
	<div
		v-if="apiData"
		:style="{
			backgroundImage: `url(${background})`,
			backgroundPosition: 'center center',
			backgroundSize: 'cover',
		}"
		class="container"
	>
		<!-- <v-card color="#1d2028" class="mx-auto" max-width="500">
>>>>>>> c7368ae (feat(pong): Front for the Pong)
=======
	<v-container>
		<div v-if="apiData">
			<v-card color="#1d2028" class="mx-auto" max-width="500">
>>>>>>> c80165e (fix: github issue)
				<v-card-title class="d-flex align-center justify-center" :style="{ backgroundColor: '#191b22' }">
					<p>Game info</p>
				</v-card-title>
				<v-card-text class="px-5">
					<span>GameUID : </span>
					<span class="font-weight-bold">
						{{ apiData.uid }}
<<<<<<< HEAD
=======
			<div v-if="isConnected">
=======
			<div>
>>>>>>> 98da990 (feat(pong): Improve Pong, fix a lot a Backend error + more frontend.)
				<GameCanvas />
				<span class="d-flex justify-center align-center ga-10">
					<span class="d-flex justify-center ga-1">
						<img height="50" width="50" src="/game/keys/W_KEY.gif" />
						<h4 class="ml-2">UP</h4>
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
					</span>
					<span class="d-flex justify-center ga-1">
						<img height="50" width="50" src="/game/keys/S_KEY.gif" />
						<h4 class="ml-2">DOWN</h4>
					</span>
<<<<<<< HEAD
=======
					</span>
					<br />
					<span>Creation Date : </span>
					<span class="font-weight-bold">
						{{ apiData.created_at }}
					</span>
>>>>>>> c80165e (fix: github issue)
					<br />
					<div v-if="apiData.started_at">
						<span>Started Date : </span>
						<span class="font-weight-bold">
							{{ apiData.started_at }}
						</span>
					</div>
					<div v-if="apiData.end_at">
						<span>Ended Date : </span>
						<span class="font-weight-bold">
							{{ apiData.end_at }}
						</span>
					</div>
					<span>
						Socket Connection :
						<span :style="{ color: `${isConnected ? '#00E676' : '#D50000'}` }" class="font-weight-bold">
							{{ isConnected }}
						</span>
					</span>
				</v-card-text>
			</v-card>

			<v-card v-if="players.length > 0" color="#272b35" class="mx-auto mt-3" max-width="500">
				<v-card-title class="d-flex align-center justify-center" :style="{ backgroundColor: '#21242d' }">
					<span>Players in Game</span>
				</v-card-title>
				<v-card-text class="px-5" :style="{ backgroundColor: 'transparent' }">
					<v-list dense :style="{ backgroundColor: 'transparent', color: 'white' }">
						<v-list-item v-for="player in players" :key="player.id">
<<<<<<< HEAD
							{{ player.id }} -
							<v-avatar>
								<v-img :src="player.avatar" />
							</v-avatar>
							{{ player.displayName }} :
=======
							{{ player.id }} - {{ player.displayName }} :
>>>>>>> c80165e (fix: github issue)
							<span
								:style="{ color: `${player.isSpec ? '#00E676' : '#D50000'}` }"
								class="font-weight-bold"
							>
								Spectator
							</span>
						</v-list-item>
					</v-list>
				</v-card-text>
<<<<<<< HEAD
			</v-card> -->
		<!-- <v-btn
=======
			</v-card>
			<v-btn
>>>>>>> c80165e (fix: github issue)
				v-if="isConnected"
				color="primary"
				dark
				absolute
				class="d-flex mx-auto align-center justify-center mt-3"
				top:style="{left: '50%', transform:'translateX(-50%)'}"
				@click="test()"
			>
				Connect FakeUser
<<<<<<< HEAD
			</v-btn> -->
<<<<<<< HEAD
			<div v-if="isConnected">
>>>>>>> ef81387 (feat(pong): Start Responsive)
				<GameCanvas />
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
		<GameModal v-if="gameEnded" :isWinner="isWinner" :isLoser="isLoser" :apiData="apiData" :dialogValue="dialogVisible" />
		<v-btn color="primary" @click="openDialog">Open Dialog</v-btn>
		<Snackbar />
	</main>
=======
		<div v-if="isConnected">
			<GameCanvas />
			<v-card color="transparent" class="d-flex justify-space-around pa-0">
				<v-img height="50" src="/game/keys/W_KEY.gif" />
				<v-img height="50" src="/game/keys/S_KEY.gif" />
			</v-card>
		</div>
	</div>
	<Snackbar />
>>>>>>> c7368ae (feat(pong): Front for the Pong)
=======
				</span>
			</div>
		</div>
		<Snackbar />
	</main>
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
=======
			</v-btn>
			<div v-if="isConnected">
				<GameCanvas />
			</div>
		</div>
		<Snackbar />
	</v-container>
>>>>>>> c80165e (fix: github issue)
</template>

<script lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useSnackbarStore } from '../../stores/snackbar';
<<<<<<< HEAD
import { useUser } from '../../stores/user';
import { useSocketStore } from '../../stores/websocket';
import Snackbar from '../utils/Snackbar.vue';
import GameModal from '../utils/GameModal.vue';
=======
import { useSocketStore } from '../../stores/websocket';
import Snackbar from '../utils/Snackbar.vue';
>>>>>>> c80165e (fix: github issue)

import GameCanvas from './GameCanvas.vue';

const snackbarStore = useSnackbarStore();

export default {
	name: 'PongGame',
<<<<<<< HEAD
	components: { Snackbar, GameCanvas, GameModal },
	setup() {
		const webSocketStore = useSocketStore();
		const userStore = useUser();

		const isConnected = computed(() => webSocketStore.isConnected);
		const socket = computed(() => webSocketStore.getSocket);
		const JWT = computed(() => userStore.getJWT);

		const connect = async (JWT: string) => {
			await webSocketStore.connect(JWT, import.meta.env.VITE_GAME_SOCKET_PORT);
=======
	components: { Snackbar, GameCanvas },
	setup() {
		const webSocketStore = useSocketStore();

		const isConnected = computed(() => webSocketStore.isConnected);
		const socket = computed(() => webSocketStore.getSocket);

		const connect = async (JWT: string) => {
			await webSocketStore.connect(JWT);
>>>>>>> c80165e (fix: github issue)
		};

		const disconnect = () => {
			webSocketStore.disconnect();
		};

		const socketListen = () => {
<<<<<<< HEAD
			if (socket.value) {
				socket.value.on('game-error', (data: any) => {
					disconnect();
					snackbarStore.showSnackbar(data, 3000, 'red');
=======
			console.log('socket : ', socket.value);
			if (socket.value) {
				socket.value.on('game_error', (data: any) => {
					disconnect();
					snackbarStore.showSnackbar(data, 3000, 'red');
					console.log('Données reçues du canal game_error :', data);
>>>>>>> c80165e (fix: github issue)
				});
			}
		};
		return {
			isConnected,
			socket,
			connect,
			disconnect,
			socketListen,
<<<<<<< HEAD
			JWT,
=======
>>>>>>> c80165e (fix: github issue)
		};
	},
	data() {
		return {
<<<<<<< HEAD
			gameEnded: false as boolean,
			apiData: null as any,
			gameUID: null as string | null,
			players: [] as any[],
			background: null as any,
<<<<<<< HEAD
			dialogVisible: false as boolean,
			isWinner: false as boolean,
			isLoser: false as boolean,
			test: 'test',
=======
>>>>>>> c7368ae (feat(pong): Front for the Pong)
=======
			apiData: null as any,
			gameUID: null as string | null,
			players: [] as any[],
>>>>>>> c80165e (fix: github issue)
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

<<<<<<< HEAD
		const backgroundList: string[] = [];
<<<<<<< HEAD
<<<<<<< HEAD
		const images = import.meta.glob('/public/game/battleBackground/*.png');
<<<<<<< HEAD
=======
		const images = import.meta.glob('/public/battleBackground/*.png');
=======
		const images = import.meta.glob('/public/game/battleBackground/*.png');
>>>>>>> 6ed663d (feat(pong): Responsivity)
		console.log(images);
>>>>>>> c7368ae (feat(pong): Front for the Pong)
=======
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
		for (const path in images) {
			backgroundList.push(path);
		}
		this.background = backgroundList[Math.floor(Math.random() * backgroundList.length)];
<<<<<<< HEAD
<<<<<<< HEAD
		this.background = this.background.replace('/public', '');
=======
>>>>>>> c7368ae (feat(pong): Front for the Pong)
=======
		this.background = this.background.replace('/public', '');
>>>>>>> 1f4dfd0 (feat(pong): Improve IA deplacement + add life visualation)

=======
>>>>>>> c80165e (fix: github issue)
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
<<<<<<< HEAD
				Authorization: `Bearer ${this.JWT}`,
=======
				Authorization: `Bearer ${JWT}`,
>>>>>>> c80165e (fix: github issue)
				'Access-Control-Allow-Origin': '*',
			},
		};
		// eslint-disable-next-line no-undef
<<<<<<< HEAD
		await fetch(
			`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/game/${this.gameUID}`,
			requestOptions,
		)
=======
		await fetch(`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/game/${this.gameUID}`, requestOptions)
>>>>>>> c80165e (fix: github issue)
			.then(async (response) => {
				if (!response.ok) {
					const data = await response.json();
					snackbarStore.showSnackbar(data.message, 3000, 'red');
					throw new Error(data.message);
				}
				return response.json();
			})
			.then(async (data) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
				console.log(data);
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
=======
>>>>>>> 98da990 (feat(pong): Improve Pong, fix a lot a Backend error + more frontend.)
				if (data.end_at) {
					this.apiData = data;
					snackbarStore.showSnackbar('Game is ended', 3000, 'primary');
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
<<<<<<< HEAD
=======
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
>>>>>>> ef81387 (feat(pong): Start Responsive)
=======
>>>>>>> 6505030 (feat(pong): Responsivity & Design)

							this.socket.on('game-start', (data: any) => {
								snackbarStore.showSnackbar('Game Starting !', 3000, 'green');
								this.apiData.started_at = data.startDate;
							});

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
							this.socket.on('game-end', (data: any) => {
								this.disconnect();
								if (!snackbarStore.snackbar)
									snackbarStore.showSnackbar('Game is ended', 3000, 'primary');
<<<<<<< HEAD
								this.dialogVisible = true;
								console.log(data);
								this.apiData = data;
								this.gameEnded = true;
								if (data.winner) console.log(`Winner : ${data.winner.user.login}`);
							});
=======
						this.socket.on('game-end', (data: any) => {
							this.disconnect();
							// if (!snackbarStore.snackbar) snackbarStore.showSnackbar('Game is ended', 3000, 'primary');
							if (data.winner) console.log(`Winner : ${data.winner.user.login}`);
						});
>>>>>>> ef81387 (feat(pong): Start Responsive)

							this.socket.on('game-win', () => {
								console.log('Win!');
								this.isWinner = true;
=======
								if (data.winner) console.log(`Winner : ${data.winner.user.login}`);
							});

							this.socket.on('game-win', () => {
								console.log('Win!');
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
								snackbarStore.showSnackbar('You win!', 3000, 'green');
							});

							this.socket.on('game-lose', () => {
								console.log('lose!');
<<<<<<< HEAD
								this.isLoser = true;
=======
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
								snackbarStore.showSnackbar('You lose!', 3000, 'red');
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
					this.apiData = data;
					if (data.isSpec) snackbarStore.showSnackbar('Connecting to the game session.', 3000, 'orange');
					else snackbarStore.showSnackbar('Joining game session.', 3000, 'green');
				}
<<<<<<< HEAD
=======
					})
					.catch((error: any) => {
						snackbarStore.showSnackbar(error, 3000, 'red');
=======
				await this.connect(JWT)
					.then(() => {
						console.log('connected');
						this.socketListen();
						this.socket.on('session-info', (data: any) => {
							this.players = [];
							console.log('Données reçues du canal session-info :', data);
							for (let i = 0; i < data.length; i++) {
								data[i].user.isSpec = data[i].isSpec;
								if (data[i].user) this.players.push(data[i].user);
								console.log(data[i].user);
							}
						});
						this.socket.on('game_start', (data: any) => {
							console.log('game_start');
							snackbarStore.showSnackbar(data, 3000, 'green');
							this.apiData.started_at = new Date();
							console.log('Données reçues du canal game_start :', data);
						});
						this.socket.on('game_end', (data: any) => {
							console.log('game_end');
							this.disconnect();
							snackbarStore.showSnackbar(data, 3000, 'primary');
							console.log('Données reçues du canal game_end :', data);
						});
						this.socket.emit('session-join', {
							gameUID: this.gameUID,
							userID: data.player_id,
							isSpec: data.is_spec,
						});
					})
					.catch((error: any) => {
						snackbarStore.showSnackbar(error, 3000, 'red');
						console.log('error : ', error);
>>>>>>> c80165e (fix: github issue)
						return;
					});
				this.apiData = data;
				if (data.isSpec) snackbarStore.showSnackbar('Connecting to the game session.', 3000, 'orange');
				else snackbarStore.showSnackbar('Joining game session.', 3000, 'green');
<<<<<<< HEAD
>>>>>>> ef81387 (feat(pong): Start Responsive)
=======
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
=======
>>>>>>> c80165e (fix: github issue)
			})
			.catch((error) => {
				console.error(error);
			});
	},
	mounted() {},
	methods: {
<<<<<<< HEAD
<<<<<<< HEAD
		openDialog() {
			this.gameEnded = true;
			this.apiData = { "winner": { "user": { "id": 2, "login": "norminet", "displayName": "Norminet", "avatar": "https://preview.redd.it/sky2ka084ns11.jpg?width=640&crop=smart&auto=webp&s=a7f060f539797578a109af48a5ee75909f7661cb" }, "score": 6, "side": 1 }, "loser": { "user": { "id": 1, "login": "thzeribi", "displayName": "Theo", "avatar": "https://i.imgur.com/XXxzteU.png" }, "score": 1, "side": 0 }, "startDate": "2023-11-20T12:00:38.537Z", "endingDate": "2023-11-20T12:01:24.445Z" };
			this.isLoser = true;
			this.dialogVisible = true;
=======
		test() {
=======
		test() {
			console.log(this.isConnected);
>>>>>>> c80165e (fix: github issue)
			if (this.isConnected) {
				this.socket.emit('session-join-test', {
					gameUID: this.gameUID,
				});
			}
<<<<<<< HEAD
>>>>>>> ef81387 (feat(pong): Start Responsive)
=======
>>>>>>> c80165e (fix: github issue)
		},
	},
};
</script>
<<<<<<< HEAD
<style scoped>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
@font-face {
	font-family: 'OMORI_MAIN';
	src: url('/fonts/OMORI_GAME.ttf') format('truetype-variations');
}

@font-face {
	font-family: 'OMORI_DISTURBED';
	src: url('/fonts/OMORI_GAME2.ttf') format('truetype-variations');
}

h4 {
<<<<<<< HEAD
<<<<<<< HEAD
	font-family: 'OMORI_MAIN', sans-serif;
=======
	font-family: 'OMORI_MAIN';
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
=======
	font-family: 'OMORI_MAIN', sans-serif;
>>>>>>> 8f38e0e (chore: Fix linter error)
	font-size: xx-large;
	text-align: center;
	color: rgb(65, 37, 37);
	text-shadow:
		1px 1px 2px plum,
		0 0 1em rgb(255, 123, 255),
		0 0 0.2em rgb(255, 255, 255);
}

<<<<<<< HEAD
.container {
	overflow: hidden;
	height: 100vh;
}

=======
=======
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
.container {
	overflow: hidden;
	height: 100vh;
}
>>>>>>> 6ed663d (feat(pong): Responsivity)
</style>
=======
>>>>>>> c80165e (fix: github issue)
