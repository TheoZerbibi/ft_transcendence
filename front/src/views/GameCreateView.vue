<template>
	<v-card class="d-flex align-center justify-center" min-height="100%" :style="{ backgroundColor: color }">
		<v-btn
			dark
			absolute
			width="22vw"
			:style="{
				backgroundImage: `url(/game/UI/fightButton.png)`,
				backgroundPosition: 'center center',
				backgroundSize: '100% 100%',
				backgroundRepeat: 'no-repeat',
			}"
			@mouseover="showOverlay = true"
			@mouseleave="showOverlay = false"
			@click="checkExistingGame()"
		>
			<div v-show="showOverlay" class="overlay" :class="{ 'slide-animation': showOverlay }">
				<img src="/game/UI/handSelection.png" alt="Hand Image" />
			</div>
		</v-btn>
		<Snackbar />
	</v-card>
</template>

<script lang="ts">
import { computed } from 'vue';

import Snackbar from '../components/utils/Snackbar.vue';
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
		return {
			JWT,
		};
	},
	data() {
		return {
			color: '#2e2e2e',
			showOverlay: false,
		};
	},
	methods: {
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
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
<style scoped>
.overlay {
	position: absolute;
	top: 0;
	left: 4vw;
	width: 100%;
	height: 100%;
	background: none;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: flex-start; /* Alignez l'image à gauche de l'overlay */
}

.slide-animation {
	animation: slideAnimation 1s linear infinite; /* Définir la durée, le type et le nombre d'itérations */
}

@keyframes slideAnimation {
	0% {
		transform: translateX(0);
	}
	50% {
		transform: translateX(10px); /* Ajuster la valeur selon vos besoins */
	}
	100% {
		transform: translateX(0);
	}
}

.overlay img {
	max-width: 100%;
	max-height: 100%;
	object-fit: contain; /* Ajuste la taille de l'image tout en préservant les proportions */
}
</style>
