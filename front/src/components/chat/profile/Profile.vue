<template>
	<v-card-title>Profile</v-card-title>
	@{{ user.login }}
	<v-img class="cadre-responsive" src="/ui/polaroid.png">
		<v-img
		class="avatar-responsive"
		:src="user.avatar"
		/>
		<h2>{{ user.displayName }}</h2>
	</v-img>
	<div v-if="Object.keys(gameStats).length ">
		{{ gameStats }}
	</div>
	<div v-else>
		~ no game found ~	
	</div>
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
			gameStats: {},
		};
	},
	beforeMount() {
		this.fetchGameStat();
	},
	methods: {
		fetchGameStat: async function () {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/game/getMyGameStat`,
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
				this.gameStats = data;
				console.log(data);
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
	},
};
</script>

<style scoped>
.cadre-responsive {
	width: 6vw;
	height: 8vw;
}

.avatar-responsive {
	width: 6vw;
	height: 7vw;
	z-index: -999;
}
</style>
