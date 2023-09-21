<template>
	<div v-if="apiData === null || _error">
		<v-snackbar :timeout="5000" v-model="_error" color="red">
			{{ apiData }}
		</v-snackbar>
	</div>
	<div v-if="apiData && _success">
		<div v-if="apiData.isSpec === true">
			<v-snackbar :timeout="3000" v-model="_success" :top="true" :center="true" color="orange">
				Connecting to the game session.
			</v-snackbar>
		</div>
		<div v-else>
			<v-snackbar :timeout="3000" v-model="_success" :top="true" :center="true" color="green">
				Joining game session.
			</v-snackbar>
		</div>
		<v-card color="#1d2028" class="mx-auto" max-width="500">
			<v-card-title>
				{{ apiData.uid }}
			</v-card-title>
			<v-card-text>
				{{ apiData.created_at }}
			</v-card-text>
		</v-card>
	</div>
</template>
<script setup lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { ref, onBeforeUnmount, onBeforeMount } from 'vue';
import io from 'socket.io-client';

const route = useRoute();
const uid = route.params.uid;
const jwt_token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoyLCJpYXQiOjE2OTUyNzc5NjEsImV4cCI6MTY5NTI4ODc2MX0.YEeyaSHec-jtbEoG3UpfrTgcexMk6qXkRnv6Cb5xA5w';
const apiData: any = ref(null);
const _error: any = ref(false);
const _success: any = ref(false);
const socket: any = ref(null);

onBeforeMount(async () => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwt_token}`,
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify({
			player_id: 1,
		}),
	};
	fetch(`http://${HOST}:3001/game/${uid}`, requestOptions)
		.then(async (response) => {
			if (!response.ok) {
				const data = await response.json();
				apiData.value = data.message;
				_error.value = true;
				throw Error(data.message);
			}
			return response.json();
		})
		.then(async (data) => {
			socket.value = await io(`http://${HOST}:4000`, {
				query: {
					uid: uid,
				},
				extraHeaders: {
					Authorization: `Bearer ${jwt_token}`,
					// Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoyLCJpYXQiOjE2OTUyNzc5NjEsImV4cCI6MTY5NTI4ODc2MX0.YEeyaSHec-jtbEoG3UpfrTgcexMk6qXkRnv6Cb5xA5z'
				},
			})
				.on('connect', () => {
					console.log('connected');
				})
				.on('error', (error: any) => {
					_error.value = true;
					apiData.value = error;
					console.log('error : ', error);
				})
				.on('disconnect', () => {
					console.log('disconnected');
				});
			console.log(socket.value);
			if (_error.value === false) {
				apiData.value = data;
				// _success.value = true;
			}
		})
		.catch((error) => {
			console.error(error);
		});
});
onBeforeUnmount(async () => {
	if (socket.value.connected) socket.value.disconnect();
});
</script>
<script lang="ts">
import { useRoute } from 'vue-router';

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
});
</script>
