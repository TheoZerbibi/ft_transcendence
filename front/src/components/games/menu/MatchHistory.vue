<template>
	<h1 class="omoriFont">Match History</h1>
	<v-list class="scrollable-list">
		<v-list-item v-for="(match, index) in matchHistory" :key="index">
			<v-list-item-title @click="redirectToGame(match.uid)" class="hoverable">
				{{ match.gamePlayer[0].login }} vs {{ match.gamePlayer[1].login }}
			</v-list-item-title>
			<v-list-item-subtitle>
				Winner:
				<span v-if="match.gamePlayer[0].is_win"> {{ match.gamePlayer[0].login }}</span>
				<span v-else>{{ match.gamePlayer[1].login }}</span> 
			</v-list-item-subtitle>
			<v-list-item-subtitle>Date: <DateViewer :timestamp="match.started_at" /></v-list-item-subtitle>
			<v-divider :thickness="0.5" class="border-opacity-25"></v-divider>
		</v-list-item>
	</v-list>
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
	overflow: scroll;
}
</style>
