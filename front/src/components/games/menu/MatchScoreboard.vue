<template>
	<div class="scoreboard-container">
		<h1 class="omoriFont">Match ScoreBoard</h1>
		<div class="scoreboard-list scrollable-list">
			<div class="scoreboard-item" v-for="(item, index) in scoreboard" :key="index">
				<div class="score-position">
					<!-- Utilisez une icône ou un texte pour la position -->
					<span v-if="index === 0" class="first-place">★</span>
					<span v-else>{{ ordinalSuffix(index + 1) }}</span>
				</div>
				<v-avatar class="user-avatar" size="48">
					<v-img :src="item.avatar" />
				</v-avatar>
				<div class="user-info">
					<h2 class="user-name">{{ item.displayName }}</h2>
					<p class="user-score">{{ item.score }} pts</p>
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

const snackbarStore = useSnackbarStore();
export default {
	name: 'MatchScoreboard',
	components: { Snackbar },
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
			scoreboard: [] as any[],
		};
	},
	beforeMount() {
		this.getScoreboard();
	},
	methods: {
		ordinalSuffix(i: number) {
			var j = i % 10,
				k = i % 100;
			if (j == 1 && k != 11) {
				return i + 'st';
			}
			if (j == 2 && k != 12) {
				return i + 'nd';
			}
			if (j == 3 && k != 13) {
				return i + 'rd';
			}
			return i + 'th';
		},
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
				`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/game/getLeaderboard`,
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
					this.scoreboard = data;
				});
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
