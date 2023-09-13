<template>
	<v-card class="d-flex align-center justify-center"  min-height="100%" v-bind:style="{ backgroundColor: color}">
		<v-btn
			color="blue"
			dark
			absolute
			top:style="{left: '50%', transform:'translateX(-50%)'}"
			v-on:click="createGame()"
			>
				Join Game
			</v-btn>
			<v-snackbar
			v-model="sendSnackbar"
			color="blue"
			>
				Creating a new game...
			</v-snackbar>
			<v-snackbar
			:timeout="3000" v-model="successSnackbar"
			color="green"
			>
				New game is created, redirecting...
			</v-snackbar>
			<v-snackbar
			:timeout="3000" v-model="failSnackbar"
			color="red"
			>
				Failed to create a new game, please try again...
			</v-snackbar>
	</v-card>
</template>


<script lang="ts">

export default {
	name: 'GameCreatorView',
	data() {
		return {
			color: '#2e2e2e',
			jwt_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoxLCJpYXQiOjE2OTQ2MTkzNzcsImV4cCI6MTY5NDYzMDE3N30.ABA96QKesPPIpZOxr0hp1csaCDaP14P1UUU5WlQKP-I',
			sendSnackbar: false,
			successSnackbar: false,
			failSnackbar: false,
			gameUUID: 0,
		}
	},
	methods: {
		createGame: async function()  {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json", "Authorization": `Bearer ${this.jwt_token}`,"Access-Control-Allow-Origin": "*" },
			};
			this.sendSnackbar = true;

			await fetch('http://paul-f5Ar4s1.clusters.42paris.fr:3001/game/createGame', requestOptions)
			.then(response => response.json())
			.then((data) => {
				console.log(data.uid);
				this.sendSnackbars = false;
				this.successSnackbar = true;
				this.$router.push({ name: `Game`, params: { uid: data.uid }})
			})
			.catch((error) => {
				console.error(error);
				this.sendSnackbar = false;
				this.failSnackbar = true;
			})
		}
	}
}
</script>
<style>
</style>
