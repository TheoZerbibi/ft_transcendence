<template>
	<div class="scoreboard-container">
		<h1 class="omoriFont">Match History</h1>
		<div class="scrollable-list d-flex flex-column justify-center align-center">
			<div class="scoreboard-item" v-for="(match, index) in matchHistory" :key="index">
				<div click="redirectToGame(match.uid)" class="hoverable omoriFont">
					<h2>{{ match.gamePlayer[0].login }}</h2>
					<h3>vs</h3>
					<h2>{{ match.gamePlayer[1].login }}</h2>
				</div>
				<v-divider :thickness="10" class="border-opacity-0"></v-divider>
				<div class="user-info">
					<div class="user-name">
						Winner:
						<span v-if="match.gamePlayer[0].is_win"> {{ match.gamePlayer[0].login }}</span>
						<span v-else>{{ match.gamePlayer[1].login }}</span>
					</div>
					<div class="user-score omoriFont">Date:
						<DateViewer :timestamp="match.started_at" />
					</div>
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
import DateViewer from '../../utils/DateConv.vue';

const snackbarStore = useSnackbarStore();
export default {
	name: 'MatchHistory',
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
			matchHistory: [] as any[],
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
				`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/game/getMatchHistory`,
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
					this.matchHistory = data;
				});
		},
		redirectToGame(uid: string) {
			this.$router.push({ name: `Game`, params: { uid: uid } });
		},
	},
};
</script>

<style scoped>
.scrollable-list {
	max-height: 100%;

}

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
