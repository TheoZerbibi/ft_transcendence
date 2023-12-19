<template>
	<v-main class="d-flex align-center justify-center" height="100vh">
		<div
			:style="{
				backgroundImage: `url(/game/menu/arcade.png)`,
				backgroundPosition: 'center center',
				backgroundSize: 'contain',
			}"
			class="d-flex align-center justify-center arcade-container"
		>
			<div class="title-container">
				<h1 class="omoriArcade">OMORI Pong</h1>
			</div>
			<div class="data-container">
				<Suspense>
					<main>
						<v-col v-if="index === 0" cols="12" class="d-flex justify-center align-center">
							<MatchScoreboard />
						</v-col>
						<v-col v-if="index === 1" cols="12" class="d-flex justify-center align-center">
							<MatchHistory />
						</v-col>
						<v-col v-if="index === 2" cols="12" class="d-flex justify-center align-center">
							<MatchSpectate />
						</v-col>
					</main>

					<template #fallback>
						<div>Loading...</div>
					</template>
				</Suspense>
			</div>
			<div class="step-container d-flex justify-center align-center">
				<h2 class="omoriFont">{{ previousStep }}</h2>
				<h2 class="omoriFont">{{ nextStep }}</h2>
			</div>
		</div>
	</v-main>
</template>

<script lang="ts">
import { computed } from 'vue';

import Snackbar from '../components/layout/Snackbar.vue';
import MatchScoreboard from '../components/games/menu/MatchScoreboard.vue';
import MatchHistory from '../components/games/menu/MatchHistory.vue';
import MatchSpectate from '../components/games/menu/MatchSpectate.vue';
import { useSnackbarStore } from '../stores/snackbar';
import { useUser } from '../stores/user';

const snackbarStore = useSnackbarStore();

export default {
	name: 'GameCreatorView',
	components: { Snackbar, MatchScoreboard, MatchHistory, MatchSpectate },
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
			steps: ['scoreboard', 'history', 'spectate'] as string[],
			nextStep: '' as string,
			previousStep: '' as string,
		};
	},
	beforeMount() {
		if (!this.JWT || !this.user) {
			return this.$router.push({ name: `Login` });
		}
		this.nextStep = this.index + 1 == this.steps.length ? this.steps[0] : this.steps[this.index + 1];
		this.previousStep = this.index - 1 < 0 ? this.steps[this.steps.length - 1] : this.steps[this.index - 1];
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
			else if (event.key === 'ArrowLeft') this.changeStep(--this.index);
			else if (event.key === 'ArrowRight') this.changeStep(++this.index);
			else if (event.key === 'Enter') this.checkExistingGame();
		},
		changeStep(_index: number) {
			if (_index < 0) this.index = this.steps.length - 1;
			else if (_index >= this.steps.length) this.index = 0;
			else this.index = _index;
			this.nextStep = this.index + 1 == this.steps.length ? this.steps[0] : this.steps[this.index + 1];
			this.previousStep = this.index - 1 < 0 ? this.steps[this.steps.length - 1] : this.steps[this.index - 1];
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
}

.omoriFont {
	margin: 0 9vw; /* Ajustez la valeur pour obtenir l'espacement désiré */
}

.arcade-container {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100%;
	z-index: 2;
}

.title-container {
	position: absolute;
	top: 21%;
	left: 51%;
	transform: translate(-50%, -50%);
	width: 100vw;
}

.data-container {
	position: absolute;
	top: 38%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100vw;
	height: 34vh;
}

.step-container {
	position: absolute;
	top: 57%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 5vh;
	width: 100vw;
}

.omoriArcade {
	color: #2c5529;
	font-size: 3.3vh;
	letter-spacing: 0.6em;
	text-align: center;
}

.omoriFont {
	color: #2c5529;
}

@media (max-width: 1280px) {
	.title-container {
		top: 30%;
	}

	.data-container {
		top: 42%;
		height: 23vh;
	}

	.step-container {
		top: 55%;
		height: 5vh;
	}

	.omoriArcade {
		font-size: 3.3vh;
		letter-spacing: 0.6em;
	}
}

@media (max-width: 1120px) {
	.title-container {
		top: 30%;
	}

	.omoriArcade {
		font-size: 3vh;
		letter-spacing: 0.6em;
	}
}

@media (max-width: 800px) {
	.title-container {
		top: 30%;
	}

	.omoriArcade {
		font-size: 3vh;
		letter-spacing: 0.6em;
	}
}

@media (max-width: 600px) {
	.title-container {
		top: 35%;
	}

	.omoriArcade {
		font-size: 2.5vh;
		letter-spacing: 0.4em;
	}
}

@media (max-width: 500px) {
	.title-container {
		top: 38%;
	}

	.omoriArcade {
		font-size: 2.1vh;
		letter-spacing: 0.4em;
	}
}

@media (max-width: 450px) {
	.title-container {
		top: 41%;
	}

	.omoriArcade {
		font-size: 1.8vh;
		letter-spacing: 0.2em;
	}
}

@media (max-width: 400px) {
	.title-container {
		top: 34%;
	}
	.omoriArcade {
		font-size: 2vh;
	}
}
</style>
