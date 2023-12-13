<template>
	<v-container class="d-flex flex-column justify-space-evenly scroll-disable" fill-height>
		<v-row>
			<v-col cols="12" class="d-flex align-center justify-center">
				<v-sheet id="arcade" class="order-0 pa-2 ma-2" height="110dvh" width="120dvh">
					<h1 class="omoriArcade">{{ step[index] }}</h1>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { computed } from 'vue';

import Snackbar from '../components/layout/Snackbar.vue';
import { useSnackbarStore } from '../stores/snackbar';
import { useUser } from '../stores/user';

const snackbarStore = useSnackbarStore();

export default {
	name: 'GameCreatorView',
	components: { Snackbar },
	beforeRouteLeave(to: any, from: any, next: any) {
		snackbarStore.hideSnackbar();
		next();
	},
	setup() {
		const userStore = useUser();
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			user,
		};
	},
	data() {
		return {
			index: 0,
			step: ['scoreboard', 'history', 'spectate'] as string[],
		};
	},
	beforeMount() {
		if (!this.JWT || !this.user) {
			return this.$router.push({ name: `Login` });
		}
	},
	mounted() {
		window.addEventListener('keydown', this.handleKeyPress);
	},
	beforeUnmount() {
		window.removeEventListener('keydown', this.handleKeyPress);
	},
	methods: {
		handleKeyPress(event: any) {
			if (event.key === 'Escape') this.$router.push({ name: `Home` });
			else if (event.key === 'ArrowLeft') this.changeStep(++this.index);
			else if (event.key === 'ArrowRight') this.changeStep(--this.index);
			// else this.checkExistingGame();
		},
		changeStep(_index: number) {
			if (_index < 0) this.index = this.step.length - 1;
			else if (_index >= this.step.length) this.index = 0;
			else this.index = _index;
		},
		checkExistingGame: async function () {
			const requestOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.JWT}`,
					'Access-Control-Allow-Origin': '*',
				},
			};
			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/game/getEmptyGame`,
					requestOptions,
				);
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				const data = await response.json();
				if (!data.uid) this.createGame();
				else this.$router.push({ name: `Game`, params: { uid: data.uid } });
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		createGame: async function () {
			const requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.JWT}`,
					'Access-Control-Allow-Origin': '*',
				},
			};
			snackbarStore.showSnackbar('Creating a new game...', 3000, 'blue');

			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/game/createGame`,
					requestOptions,
				);
				snackbarStore.hideSnackbar();
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				snackbarStore.showSnackbar('New game is created, redirecting...', 3000, 'green');
				const data = await response.json();
				this.$router.push({ name: `Game`, params: { uid: data.uid } });
			} catch (error: any) {
				snackbarStore.showSnackbar("Can't create game.", 3000, 'red');
			}
		},
	},
};
</script>
<style scoped>
*,
html,
body {
	overflow: hidden;
	height: 100vh;
}

#arcade {
	background: url('/public/game/menu/arcade.png');
	object-fit: cover;
	object-position: center;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	aspect-ratio: 1;
	z-index: 2;
	overflow-y: hidden; /* Hide vertical scrollbar */
	overflow-x: hidden;
}
</style>
