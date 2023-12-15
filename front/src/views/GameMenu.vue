<template>
	<v-container class="arcade-container" fill-height>
		<v-row justify="center" align="center">
			<v-col cols="12" class="d-flex justify-center align-center">
				<div class="title-container">
					<h1 class="omoriArcade">OMORI Pong</h1>
				</div>
			</v-col>
			<div>
				<Suspense>
					<main>
						<v-col v-if="index === 0" cols="12" class="d-flex justify-center align-center">
							<div class="scoreboard-container">
								<MatchScoreboard />
							</div>
						</v-col>
						<v-col v-if="index === 1" cols="12" class="d-flex justify-center align-center">
							<div class="history-container">
								<MatchHistory />
							</div>
						</v-col>
						<v-col v-if="index === 2" cols="12" class="d-flex justify-center align-center">
							<div class="spectate-container">
								<MatchSpectate />
							</div>
						</v-col>
					</main>

					<template #fallback>
						<div>Loading...</div>
					</template>
				</Suspense>
			</div>
			<v-col cols="12" class="d-flex justify-center align-center">
				<h2 class="omoriFont">{{ previousStep }} </h2>
				<h2 class="omoriFont"> {{ nextStep }}</h2>
			</v-col>
		</v-row>
	</v-container>
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
			else this.checkExistingGame();
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

<style lang="sass" scoped>
*, html, body
  overflow: hidden

.arcade-container
  overflow: hidden
  position: relative
  background: url('/game/menu/arcade.png')
  background-size: contain
  background-position: center
  background-repeat: no-repeat
  z-index: 2
  width: 100%
  height: 100vh

.title-container
  position: absolute
  top: 26%
  left: 51%
  transform: translate(-50%, -50%)
  width: 100vw
  height: 10vw

.scoreboard-container
  position: relative
  top: 30vh
  left: 49%
  transform: translate(-7%)
  width: 100vw
  height: 22vw

.history-container
  position: relative
  top: 30vh
  left: 49%
  transform: translate(-7%)
  width: 100vw
  height: 22vw

.spectate-container
  position: relative
  top: 30vh
  left: 49%
  transform: translate(-7%)
  width: 100vw
  height: 22vw

.omoriArcade
  color: #2c5529
  font-size: 2vw
  letter-spacing: 0.6em
  text-align: center

.omoriFont
  color: #2c5529

@media (max-width: 1280px)
  .title-container
    top: 32%

@media (max-width: 1100px)
  .title-container
    top: 32%

@media (max-width: 600px)
  .title-container
    top: 41%

@media (max-width: 400px)
  .omoriArcade
    font-size: 2vw

  .title-container
    top: 40%
</style>
