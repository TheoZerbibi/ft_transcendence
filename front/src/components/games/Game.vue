<template>
	<div v-if="apiData === null || error">
		<v-snackbar :timeout="5000" v-model="error" color="red">
			{{ apiData }}
		</v-snackbar>
	</div>
	<div v-if="apiData">
		<div v-if="apiData.isSpec === true">
			<v-snackbar :timeout="3000" v-model="success" color="orange"> Connecting to the game session. </v-snackbar>
		</div>
		<div v-else>
			<v-snackbar :timeout="3000" v-model="success" color="green"> Joining game session. </v-snackbar>
		</div>
		<v-card color="#1d2028" class="mx-auto" max-width="500">
			<v-card-title>
				{{ apiData.uid }}
			</v-card-title>
			<v-card-text>
				{{ apiData.createdAt }}
			</v-card-text>
		</v-card>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';

export default defineComponent({
	name: 'Game',

	data() {
		return {
			gameUID: '',
		};
	},
	mounted() {
		const route = useRoute();
		this.gameUID = route.params.uid;
	},
	setup() {
		const route = useRoute();
		const uid = route.params.uid;
		const jwt_token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoxLCJpYXQiOjE2OTUxOTU2MzEsImV4cCI6MTY5NTIwNjQzMX0.3sinu1r1aEXibiacpJDibG5k3z0uchuJMsGlbx7C3gA';
		const apiData: any = ref(null);
		const error: any = ref(false);
		const success: any = ref(false);

		onMounted(async () => {
			const socket = io('http://localhost:3000');
			const socketInfo = {
				id: socket.ids,
			};
			const playerSocket: any = JSON.stringify(socketInfo);
			console.log(socket);
			const requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt_token}`,
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify({
					playerId: 1,
					socket: playerSocket,
				}),
			};
			fetch(`http://${HOST}:3001/game/${uid}`, requestOptions)
				.then(async (response) => {
					if (!response.ok) {
						const data = await response.json();
						apiData.value = data.message;
						error.value = true;
						throw Error(data.message);
					}
					return response.json();
				})
				.then((data) => {
					apiData.value = data;
					success.value = true;
				})
				.catch((error) => {
					console.error(error);
				});
		});
		return {
			apiData,
			error,
			success,
		};
	},
});
</script>
