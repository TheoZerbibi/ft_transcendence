<template>
	<div>
		<div v-if="apiData">
			<v-card color="#1d2028" class="mx-auto" max-width="500">
				<v-card-title>
					{{ apiData.uid }}
				</v-card-title>
				<v-card-text>
					{{ apiData.created_at }}
				</v-card-text>
			</v-card>
		</div>
		<Snackbar />
	</div>
</template>

<script lang="ts">
import { Socket } from 'dgram';
import { useRoute } from 'vue-router';
import { webSocketService } from '../../services/WebSocketService';
import { useSnackbarStore } from '../../stores/snackbar';
import Snackbar from '../utils/Snackbar.vue';

const snackbarStore = useSnackbarStore();

export default {
	name: 'Game',
	components: { Snackbar },
	beforeRouteLeave(to: any, from: any, next: any) {
		if (this.socket.connected) this.socket.disconnect();
		snackbarStore.hideSnackbar();
		next();
	},
	data() {
		return {
			apiData: null as any,
			socket: null as Socket | null,
			gameUID: null as string | null,
			jwt_token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoxLCJpYXQiOjE2OTU1MDAxODcsImV4cCI6MTY5NTUxMDk4N30.Ct0wg9kj-o7hgCJmnVknU4IU3i2SlcDX_VNMsr1TcjM' as string,
		};
	},
	async beforeMount() {
		const route = useRoute();
		this.gameUID = route.params.uid;
		if (!this.gameUID) return;

		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.jwt_token}`,
				'Access-Control-Allow-Origin': '*',
			},
		};
		await fetch(`http://${HOST}:3001/game/${this.gameUID}`, requestOptions)
			.then(async (response) => {
				if (!response.ok) {
					const data = await response.json();
					snackbarStore.showSnackbar(data.message, 3000, 'red');
					return;
				}
				return response.json();
			})
			.then(async (data) => {
				this.socket = webSocketService.connect(this.jwt_token);
				this.socket.on('connect', () => {
					console.log('connected');
					this.socket.emit('joinGame', { uid: this.gameUID });
				});
				this.socket.on('error', (error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					console.log('error : ', error);
					return;
				});
				if (data.isSpec) snackbarStore.showSnackbar('Connecting to the game session.', 3000, 'orange');
				else snackbarStore.showSnackbar('Joining game session.', 3000, 'green');
				this.apiData = data;
				this.success = true;
			})
			.catch((error) => {
				console.error(error);
			});
	},
	mounted() {
		console.log(this.apiData);
	},
};
</script>
