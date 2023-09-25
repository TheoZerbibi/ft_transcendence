<template>
	<v-card class="d-flex align-center justify-center" min-height="100%" :style="{ backgroundColor: color }">
		<v-btn
			color="primary"
			dark
			absolute
			top:style="{left: '50%', transform:'translateX(-50%)'}"
			@click="checkExistingGame()"
		>
			Join Game
		</v-btn>
		<Snackbar />
	</v-card>
</template>

<script lang="ts">
import Snackbar from '../components/utils/Snackbar.vue';
import { useSnackbarStore } from '../stores/snackbar';

const snackbarStore = useSnackbarStore();

export default {
	name: 'GameCreatorView',
	components: { Snackbar },
	beforeRouteLeave(to: any, from: any, next: any) {
		snackbarStore.hideSnackbar();
		next();
	},
	data() {
		return {
			color: '#2e2e2e',
			jwt_token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im5vcm1pbmV0Iiwic3ViIjoyLCJpYXQiOjE2OTU2NTQ3OTcsImV4cCI6MTY5NTY2NTU5N30.5-uXPhWIrV_1tUn8vCDOjs75FWTNqz2G7bd8slcgYq8',
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
				else if (!response.ok) snackbarStore.showSnackbar('Connecting to the game session.', 3000, 'orange');
				else this.$router.push({ name: `Game`, params: { uid: data.uid } });
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
			snackbarStore.showSnackbar('Creating a new game...', 3000, 'blue');

			try {
				const response = await fetch(`http://${HOST}:3001/game/createGame`, requestOptions);
				snackbarStore.hideSnackbar();
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				snackbarStore.showSnackbar('New game is created, redirecting...', 3000, 'green');
				const data = await response.json();
				this.$router.push({ name: `Game`, params: { uid: data.uid } });
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
