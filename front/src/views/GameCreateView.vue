<template>
	<v-card class="d-flex align-center justify-center" min-height="100%" v-bind:style="{ backgroundColor: color }">
		<v-btn
			color="blue"
			dark
			absolute
			top:style="{left: '50%', transform:'translateX(-50%)'}"
			v-on:click="createGame()"
		>
			Join Game
		</v-btn>
		<v-snackbar v-model="sendSnackbar" color="blue"> Creating a new game... </v-snackbar>
		<v-snackbar :timeout="3000" v-model="successSnackbar" color="green">
			New game is created, redirecting...
		</v-snackbar>
		<v-snackbar :timeout="3000" v-model="failSnackbar" color="red">
			{{ errorMessage }}
		</v-snackbar>
	</v-card>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';

export default {
	name: 'GameCreatorView',
	data() {
		return {
			color: '#2e2e2e',
			jwt_token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoxLCJpYXQiOjE2OTQ2ODQxMjcsImV4cCI6MTY5NDY5NDkyN30.sDKq0IqtjMadaqmB7v3ojLAp--1wkK-y8lxNLnjBrRo',
			sendSnackbar: false,
			successSnackbar: false,
			failSnackbar: false,
			errorMessage: 'Failed to create a new game, please try again...',
		};
	},
	methods: {
		createGame: async function () {
			const requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.jwt_token}`,
					'Access-Control-Allow-Origin': '*',
				},
			};
			this.sendSnackbar = true;

			await fetch('http://localhost:3001/game/createGame', requestOptions)
				.then((response) => response.json())
				.then((data) => {
					this.sendSnackbars = false;
					console.log(data);
					if (data.statusCode == 401 || data.statusCode == 403 || data.statusCode == 404) {
						this.failSnackbar = true;
						return ;
					}
						console.log(data.uid);
						this.successSnackbar = true;
						this.$router.push({ name: `Game`, params: { uid: data.uid } });
				})
				.catch((error) => {
					console.error(error.message);
				});
		},
	},
};
</script>
<style></style>
