<template>
	<v-container>
		<div v-if="apiData">
			<v-card color="#1d2028" class="mx-auto" max-width="500">
				<v-card-title class="d-flex align-center justify-center">
					<p>Game info</p>
				</v-card-title>
				<v-card-text>
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
			<v-card color="#272b35" class="mx-auto" max-width="500">
				<v-card-title class="d-flex align-center justify-center">
					<span>Players in Game</span>
				</v-card-title>
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

		const connect = async (JWT: string) => {
			await webSocketStore.connect(JWT);
		};

		const disconnect = () => {
			webSocketStore.disconnect();
		};

		return {
			isConnected,
			socket,
			connect,
			disconnect,
		};
	},
	data() {
		return {
			apiData: null as any,
			gameUID: null as string | null,
			jwt_token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im5vcm1pbmV0Iiwic3ViIjoyLCJpYXQiOjE2OTU2NTQ3OTcsImV4cCI6MTY5NTY2NTU5N30.5-uXPhWIrV_1tUn8vCDOjs75FWTNqz2G7bd8slcgYq8' as string,
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
				Authorization: `Bearer ${this.jwt_token}`,
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
				await this.connect(this.jwt_token)
					.then(() => {
						console.log('connected');
						this.socket.emit('session-join', { uid: this.gameUID, userId: 1 });
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
