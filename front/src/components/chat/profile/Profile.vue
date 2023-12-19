<template>
	<v-card-title>Profile</v-card-title>
	<v-card-subtitle>Login: @{{ user.login }}</v-card-subtitle>
	<v-card-subtitle>Display name: {{ user.displayName }}</v-card-subtitle>

<!-- 	<v-avatar size="100" class="ma-2"
		rounded="0"
		variant="flat">
		<v-img cover :src="user.avatar"></v-img>
	</v-avatar> -->
	<UploadFile @imageChanged="updateAvatar">
		<template v-slot:polaroidImg>
			<v-img v-if="user.avatar" :src="user.avatar" class="hoverable" alt="Uploaded Image"> </v-img>
		</template>
	</UploadFile>

	<v-card-text v-if="Object.keys(gameStats).length">
		<v-card-subtitle>Name: {{ user.displayName }}</v-card-subtitle>
		<v-card-subtitle>Wins: {{ gameStats.wins }}</v-card-subtitle>
		<v-card-subtitle>Loses: {{ gameStats.loses }}</v-card-subtitle>
		<v-card-subtitle>Matches: {{ gameStats.matches }}</v-card-subtitle>
	</v-card-text>

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
import UploadFile from '../../layout/UploadFile.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: {
		Snackbar,
		DateViewer,
		UploadFile,
	},
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		const setAvatar = (avatar: string) => {
			userStore.setAvatar(avatar);
		};


		return {
			JWT,
			user,
			setAvatar,
		};
	},
	data() {
		return {
			gameStats: {} as any,
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
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		async updateAvatar(newAvatar: File) {
			const formData = new FormData();
			if (newAvatar) {
				formData.append('file', newAvatar);
				formData.append('login', this.user.login);
			} else {
				return console.error('newAvatar is not a File object');
			}
			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT
					}/users/getCloudinaryLink`,
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
						},
						body: formData,
					},
				);
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}

				const data = await response.json();
				this.setAvatar(data.avatar);
				const response2 = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							avatar: data.avatar,
						}),
					},
				);
			} catch (error) {
				snackbarStore.showSnackbar('Error uploading avatar', 3000, 'red');
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
