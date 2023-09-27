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
					<span>
						Socket Connection :
						<span :style="{ color: `${isConnected ? '#00E676' : '#D50000'}` }" class="font-weight-bold">
							{{ isConnected }}
						</span>
					</span>
				</v-card-text>
			</v-card>
			<v-card v-if="players.length > 0" color="#272b35" class="mx-auto" max-width="500">
				<v-card-title class="d-flex align-center justify-center" :style="{ backgroundColor: '#21242d' }">
					<span>Players in Game</span>
				</v-card-title>
				<v-card-text class="px-5" :style="{ backgroundColor : 'transparent' }">
					<v-list dense :style="{ backgroundColor : 'transparent', color: 'white' }">
						<v-list-item v-for="player in players" :key="player.id">
							<v-list-item-content>
								<v-list-item-title>
									<span>
										{{ player.id }} - {{ player.displayName }} :
										<span
											:style="{ color: `${player.isSpec ? '#00E676' : '#D50000'}` }"
											class="font-weight-bold"
										>
											Spectator
										</span>
									</span>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-card-text>
			</v-card>
		</div>
		<Snackbar />
	</v-container>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useSnackbarStore } from '../../stores/snackbar';
import { useSocketStore } from '../../stores/websocket';
import Snackbar from '../utils/Snackbar.vue';

const snackbarStore = useSnackbarStore();

export default {
	name: 'Game',
	components: { Snackbar },
	setup() {
		const webSocketStore = useSocketStore();

		const isConnected = computed(() => webSocketStore.isConnected);
		const socket = computed(() => webSocketStore.getSocket);
		let users: any;

		const connect = async (JWT: string) => {
			await webSocketStore.connect(JWT);
		};

		const disconnect = () => {
			webSocketStore.disconnect();
		};

		const socketListen = () => {
			console.log('socket : ', socket.value);
			if (socket.value) {
				// socket.value.on('session-info', (data) => {
				// 	console.log('Données reçues du canal session-info :', data);
				// 	// users = data[0].user;
				// 	users = "hello";
				// 	console.log('users : ', users);
				// });
				socket.value.on('game_error', (data) => {
					disconnect();
					snackbarStore.showSnackbar(data, 3000, 'red');
					console.log('Données reçues du canal game_error :', data);
				});
			}
		};
		return {
			isConnected,
			socket,
			connect,
			disconnect,
			socketListen,
		};
	},
	data() {
		return {
			apiData: null as any,
			gameUID: null as string | null,
			players: [] as any[],
		};
	},
	beforeUnmount() {
		if (this.isConnected) this.disconnect();
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
				Authorization: `Bearer ${JWT}`,
				'Access-Control-Allow-Origin': '*',
			},
		};
		// eslint-disable-next-line no-undef
		await fetch(`http://${HOST}:3001/game/${this.gameUID}`, requestOptions)
			.then(async (response) => {
				if (!response.ok) {
					const data = await response.json();
					snackbarStore.showSnackbar(data.message, 3000, 'red');
					throw new Error(data.message);
				}
				return response.json();
			})
			.then(async (data) => {
				await this.connect(JWT)
					.then(() => {
						console.log('connected');
						this.socketListen();
						this.socket.on('session-info', (data: any) => {
							console.log('Données reçues du canal session-info :', data);
							for (let i = 0; i < data.length; i++) {
								data[i].user.isSpec = data[i].isSpec;
								if (data[i].user) this.players.push(data[i].user);
								console.log(data[i].user);
							}
							console.log('users : ', this.players);
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
};
</script>
