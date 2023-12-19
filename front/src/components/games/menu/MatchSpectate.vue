<!-- <template>
	<h1 class="omoriFont">Match Spectate</h1>
	<div v-if="matchOngoing.length <= 0">
		<h2 class="omoriFont">No match ongoing</h2>
	</div>
	<v-list v-if="matchOngoing.length > 0" class="scrollable-list">
		<v-list-item v-for="(item, index) in matchOngoing" :key="index">
			<v-list-item-title @click="redirectToGame(item.uid)" class="hoverable">{{ item.uid }}</v-list-item-title>
			<v-list-item-subtitle>{{ item.score }}</v-list-item-subtitle>
			<v-list-item-subtitle>Start at: <DateViewer :timestamp="item.created_at" /></v-list-item-subtitle>
		</v-list-item>
	</v-list>
</template> -->

<template>
	<div class="spectate-container">
		<h1 class="omoriFont">Match Spectate</h1>
		<div v-if="matchOngoing.length <= 0">
			<h2 class="omoriFont">No match ongoing</h2>
		</div>
		<div class="scoreboard-list scrollable-list">
			<div class="scoreboard-item" v-for="(item, index) in matchOngoing" :key="index" @click="redirectToGame(item.uid)">
				<div class="user-info">
					<h2 class="user-name hoverable">{{ item.players[0].display_name }} vs {{ item.players[1].display_name }}</h2>
					<p class="user-score">Start at: <DateViewer :timestamp="item.created_at" /></p>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';
import Snackbar from '../../layout/Snackbar.vue';
import DateViewer from '../../utils/Date.vue';

const snackbarStore = useSnackbarStore();
export default {
	name: 'MatchSpectate',
	components: { Snackbar, DateViewer },
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
			matchOngoing: [] as any[],
		};
	},
	beforeMount() {
		this.getScoreboard();
	},
	methods: {
		async getScoreboard() {
			const requestOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.JWT}`,
					'Access-Control-Allow-Origin': '*',
				},
			};
			await fetch(
				`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/game/getOngoingGame`,
				requestOptions,
			)
				.then(async (response) => {
					if (!response.ok) {
						const data = await response.json();
						snackbarStore.showSnackbar(data.message, 3000, 'red');
						throw new Error(data.message);
					}
					return response.json();
				})
				.then(async (data) => {
					this.matchOngoing = data;
				});
		},
		redirectToGame(uid: string) {
			this.$router.push({ name: `Game`, params: { uid: uid } });
		},
	},
};
</script>

<style scoped>

.scoreboard-container {
	text-align: center;
}

.scoreboard-item {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 1px solid #2b532a;
	padding: 10px;
}

.scrollable-list {
	max-height: 100%;
}

.score-position {
	margin-right: 20px;
}

.first-place {
	color: gold
}

.user-avatar {
	margin-right: 20px;
}

.user-info {
	text-align: left;
}

.omoriFont {
	color: #2b532a;
}
.user-name {
	margin: 0;
	font-size: 1.5em;
	color: #2b532a;
	font-family: 'OMORI_MAIN';
}

.user-score {
	margin: 0;
	font-size: 0.9em;
	color: #2c5529;
}
</style>
