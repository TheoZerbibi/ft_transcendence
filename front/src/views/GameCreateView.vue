<template>
	<v-card class="d-flex align-center justify-center" min-height="100%" v-bind:style="{ backgroundColor: color }">
		<v-btn
			color="blue"
			dark
			absolute
			top:style="{left: '50%', transform:'translateX(-50%)'}"
			v-on:click="checkExistingGame()"
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
export default {
	name: 'GameCreatorView',
	data() {
		return {
			color: '#2e2e2e',
			jwt_token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im5vcm1pbmV0Iiwic3ViIjoyLCJpYXQiOjE2OTQ4MDYyNTcsImV4cCI6MTY5NDgxNzA1N30.pdJX73O7kh3MFl6b3W6GwgcEA12bvUZnIYFzmcxoua4',
			sendSnackbar: false,
			successSnackbar: false,
			failSnackbar: false,
			errorMessage: 'Failed to create a new game, please try again...',
		};
	},
	methods: {
		checkExistingGame: async function () {
			const requestOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.jwt_token}`,
					'Access-Control-Allow-Origin': '*',
				},
			};
			try {
				const response = await fetch(`http://${HOST}:3001/game/getEmptyGame`, requestOptions);
				const data = await response.json();
				if (!data.uid) this.createGame();
				else if (!response.ok) {
					this.errorMessage = data.message;
					this.failSnackbar = true;
					throw Error(response.statusText);
				} else this.$router.push({ name: `Game`, params: { uid: data.uid } });
			} catch (error) {
				console.error(error);
			}
		},
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

			try {
				const response = await fetch(`http://${HOST}:3001/game/createGame`, requestOptions);
				this.sendSnackbars = false;
				if (!response.ok) {
					this.errorMessage = response.statusText;
					this.failSnackbar = true;
					throw Error(response.statusText);
				}
				this.successSnackbar = true;
				const data = await response.json();
				this.$router.push({ name: `Game`, params: { uid: data.uid } });
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
