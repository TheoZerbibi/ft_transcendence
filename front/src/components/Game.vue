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
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im5vcm1pbmV0Iiwic3ViIjoyLCJpYXQiOjE2OTQ4MDYyNTcsImV4cCI6MTY5NDgxNzA1N30.pdJX73O7kh3MFl6b3W6GwgcEA12bvUZnIYFzmcxoua4';
		const apiData = ref(null);
		const error = ref(false);
		const success = ref(false);
		const color = ref('green');

		onMounted(async () => {
			const requestOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt_token}`,
					'Access-Control-Allow-Origin': '*',
				},
			};
			try {
				const response = await fetch(`http://${HOST}:3001/game/${uid}`, requestOptions);
				const data = await response.json();
				if (!response.ok) {
					console.log(data);
					apiData.value = data.message;
					error.value = true;
					throw Error(data.message);
				}
				apiData.value = data;
				success.value = true;
				if (data.isSpecial) color.value = 'orange';

				console.log(data);
			} catch (error) {
				console.error(error);
			}
		});
		return {
			apiData,
			error,
			success,
		};
	},
});
</script>
