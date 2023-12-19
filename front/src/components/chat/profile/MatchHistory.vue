<template>
	<!-- Match history list -->
	<v-card-title>Match history</v-card-title>
	<v-divider :thickness="1" class="border-opacity-100"></v-divider>
	<v-list v-if="matchHistory.length" >
		<v-list-item v-for="match in matchHistory" :key="match.uid">
			<v-list-item-title @click="redirectToGame(match.uid)" class="hoverable">
				{{ match.gamePlayer[0].login }} vs {{ match.gamePlayer[1].login }}
			</v-list-item-title>
			<v-list-item-subtitle>
				Winner:
				<span v-if="match.gamePlayer[0].is_win"> {{ match.gamePlayer[0].login }}</span>
				<span v-else>{{ match.gamePlayer[1].login }}</span> 
			</v-list-item-subtitle>
			<v-list-item-subtitle>Date:
				<DateViewer :timestamp="match.started_at" />
			</v-list-item-subtitle>
			<v-divider :thickness="0.5" class="border-opacity-25"></v-divider>
		</v-list-item>
	</v-list>
	<v-card-text v-else>~ no match found ~</v-card-text>

	<!-- Error handling -->
	<Snackbar />
</template>

<script lang="ts">
import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

import Snackbar from '../../layout/Snackbar.vue';
import DateViewer from '../../utils/DateConv.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: {
		Snackbar,
		DateViewer,
	},
	setup() {
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
			winnerName: '' as string,
		};
	},
	beforeMount() {
		this.fetchMatchHistory();
	},
	methods: {
		fetchMatchHistory: async function () {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/game/getMyMatchHistory`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					},
				);
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				const data: any = await response.json();
				console.log(data);
				this.matchHistory = data;
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		redirectToGame(uid: string) {
			this.$router.push({ name: `Game`, params: { uid: uid } });
		},
		determineWinner() {
			// Loop through matchHistory to find the winner
			this.matchHistory.forEach(match => {
				match.gamePlayers.forEach(players => {
					players.forEach(player => {
						// Check if the player is a winner
						if (player.is_win) {
							// Set the winner's name to be displayed
							this.winnerName = player.name; // Assuming 'name' is the property containing the player's name
						}
					});
				});
			});
		},
	},
};
</script>

<style scoped>
/* .scrollable-list {
	max-height: 100%;
	overflow: scroll;
} */
</style>
