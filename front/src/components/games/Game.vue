<template>
	<v-container>
		<div v-if="apiData">
			<v-card color="#1d2028" class="mx-auto" max-width="500">
				<v-card-title class="d-flex align-center justify-center" :style="{ backgroundColor: '#191b22' }">
					<p>Game info</p>
				</v-card-title>
				<v-card-text class="px-5">
					<span>GameUID : </span>
					<span class="font-weight-bold">
						{{ apiData.uid }}
					</span>
					<br />
					<span>Creation Date : </span>
					<span class="font-weight-bold">
						{{ apiData.created_at }}
					</span>
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
							{{ player.id }} - {{ player.displayName }} :
							<span
								:style="{ color: `${player.isSpec ? '#00E676' : '#D50000'}` }"
								class="font-weight-bold"
							>
								Spectator
							</span>
						</v-list-item>
					</v-list>
				</v-card-text>
			</v-card>
			<v-btn
				v-if="isConnected"
				color="primary"
				dark
				absolute
				class="d-flex mx-auto align-center justify-center mt-3"
				top:style="{left: '50%', transform:'translateX(-50%)'}"
				@click="test()"
			>
				Connect FakeUser
			</v-btn>
			<div v-if="isConnected">
				<GameCanvas />
			</div>
		</div>
		<Snackbar />
	</v-container>
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
			await webSocketStore.connect(JWT);
		};

		const disconnect = () => {
			webSocketStore.disconnect();
		};

		const socketListen = () => {
			console.log('socket : ', socket.value);
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
			port: import.meta.env.VITE_GAME_SOCKET_PORT as number,
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
				console.log('port : ', this.port);
				await this.connect(this.JWT, 'AAAAAAA')
					.then(() => {
						console.log('connected');
						this.socketListen();
						this.socket.on('session-info', (data: any) => {
							this.players = [];
							for (let i = 0; i < data.length; i++) {
								data[i].user.isSpec = data[i].isSpec;
								if (data[i].user) this.players.push(data[i].user);
								console.log(data[i].user);
								console.log(data[i].playerData);
							}
						});
						this.socket.on('game-start', (data: any) => {
							snackbarStore.showSnackbar('Game Starting !', 3000, 'green');
							this.apiData.started_at = data.startDate;
						});
						this.socket.on('game-end', (data: any) => {
							this.disconnect();
							snackbarStore.showSnackbar('Game is ended', 3000, 'primary');
							if (data.winner) alert(data.winner.login);
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
						return;
					});
				this.apiData = data;
				if (data.isSpec) snackbarStore.showSnackbar('Connecting to the game session.', 3000, 'orange');
				else snackbarStore.showSnackbar('Joining game session.', 3000, 'green');
			})
			.catch((error) => {
				console.error(error);
			});
	},
	mounted() {
		console.log('JWT : ', this.JWT);
	},
	methods: {
		test() {
			console.log(this.isConnected);
			if (this.isConnected) {
				this.socket.emit('session-join-test', {
					gameUID: this.gameUID,
				});
			}
		},
	},
};
</script>
