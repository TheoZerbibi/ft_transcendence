<template>
	<h1 class="omoriFont">Match ScoreBoard</h1>
	<v-list>
		<v-list-item v-for="(item, index) in scoreboard" :key="index">
			<v-list-item-media>
				<v-avatar>
					<v-img :src="item.avatar" />
				</v-avatar>
			</v-list-item-media>
			<v-list-item-title>{{ item.displayName }}</v-list-item-title>
			<v-list-item-subtitle>{{ item.score }}</v-list-item-subtitle>
		</v-list-item>
	</v-list>
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
