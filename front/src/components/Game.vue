<template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from "vue";
export default defineComponent({
	name: 'Game',

	data() {
		return {
			gameUID: '',
			error: 'error'
		};
	},
	mounted() {
		const route = useRoute()
		this.gameUID = route.params.uid;
	},
	async setup() {
		const route = useRoute()
		const uid = route.params.uid;
		const error = ref(null);
		const jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoxLCJpYXQiOjE2OTQ2ODQxMjcsImV4cCI6MTY5NDY5NDkyN30.sDKq0IqtjMadaqmB7v3ojLAp--1wkK-y8lxNLnjBrRo";

		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt_token}`,
				'Access-Control-Allow-Origin': '*',
			},
		};
		await fetch(`http://localhost:3001/game/${uid}`, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				if (data.statusCode == 401 || data.statusCode == 403 || data.statusCode == 500) {
					throw new Error(data.message);
				}
				console.log(data);
			})
			.catch((error) => {
				console.error(error.message);
			});
		console.log(uid);
	}
});
</script>
