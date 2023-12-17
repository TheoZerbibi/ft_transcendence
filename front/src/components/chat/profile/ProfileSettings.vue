<template>
	<v-card-title>Settings</v-card-title>

	<!-- Error handling -->
	<Snackbar />
</template>

<script lang="ts">
import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

import Snackbar from '../../layout/Snackbar.vue';
import DateViewer from '../../utils/Date.vue';

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
			matchHistory: [],
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
				this.matchHistory = data;
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
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