<template>
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
			<div>
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
		<Snackbar />
	</main>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useSnackbarStore } from '../../stores/snackbar';
import { useUser } from '../../stores/user';
import { useSocketStore } from '../../stores/websocket';
import Snackbar from '../utils/Snackbar.vue';

import GameCanvas from './GameCanvas.vue';

const snackbarStore = useSnackbarStore();

export default {
	name: 'PongGame',
	components: { Snackbar, GameCanvas },
	setup() {
		const webSocketStore = useSocketStore();
		const userStore = useUser();

		const isConnected = computed(() => webSocketStore.isConnected);
		const socket = computed(() => webSocketStore.getSocket);
		const JWT = computed(() => userStore.getJWT);

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
		};
	},
	data() {
		return {
			apiData: null as any,
			gameUID: null as string | null,
			players: [] as any[],
			background: null as any,
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

							this.socket.on('game-start', (data: any) => {
								snackbarStore.showSnackbar('Game Starting !', 3000, 'green');
								this.apiData.started_at = data.startDate;
							});

							this.socket.on('game-end', (data: any) => {
								this.disconnect();
								if (!snackbarStore.snackbar)
									snackbarStore.showSnackbar('Game is ended', 3000, 'primary');
								if (data.winner) console.log(`Winner : ${data.winner.user.login}`);
							});

							this.socket.on('game-win', () => {
								console.log('Win!');
								snackbarStore.showSnackbar('You win!', 3000, 'green');
							});

							this.socket.on('game-lose', () => {
								console.log('lose!');
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
					this.apiData = data;
					if (data.isSpec) snackbarStore.showSnackbar('Connecting to the game session.', 3000, 'orange');
					else snackbarStore.showSnackbar('Joining game session.', 3000, 'green');
				}
			})
			.catch((error) => {
				console.error(error);
			});
	},
	mounted() {},
	methods: {
		test() {
			if (this.isConnected) {
				this.socket.emit('session-join-test', {
					gameUID: this.gameUID,
				});
			}
		},
	},
};
</script>
<style scoped>
@font-face {
	font-family: 'OMORI_MAIN';
	src: url('/fonts/OMORI_GAME.ttf') format('truetype-variations');
}

@font-face {
	font-family: 'OMORI_DISTURBED';
	src: url('/fonts/OMORI_GAME2.ttf') format('truetype-variations');
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
