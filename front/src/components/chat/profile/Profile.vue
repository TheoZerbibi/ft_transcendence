<template>
	<v-card>
		<v-row>
			<v-col>
				<v-card-title>Profile</v-card-title>
				<v-card-item class="align-center justify-center">
					<UploadFile @imageChanged="updateAvatar">
						<template v-slot:polaroidImg>
							<v-img style="position:relative; top: 1.7dvh;" v-if="user.avatar" :src="user.avatar" class="hoverable"
								alt="Uploaded Image">
							</v-img>
						</template>
					</UploadFile>
					<v-card-text>
						<h4>@{{ user.login }}</h4>
						<h4>{{ user.displayName }}</h4>
					</v-card-text>
				</v-card-item>

			</v-col>

			<v-col>
				<v-card-title>Game Stats</v-card-title>
				<v-divider :thickness="7" class="border-opacity-100"></v-divider>
				<v-card-text v-if="Object.keys(gameStats).length">
					<p>Wins: {{ gameStats.wins }}</p>
					<p>Loses: {{ gameStats.loses }}</p>
					<p>Matches: {{ gameStats.matches }}</p>
				</v-card-text>
			
				<div v-else>
					~ no game found ~
				</div>
			
				<MatchHistory />
				<BlockedUsers />
			</v-col>
		</v-row>

		<!-- 	<v-avatar size="100" class="ma-2"
			rounded="0"
			variant="flat">
			<v-img cover :src="user.avatar"></v-img>
	</v-avatar> -->

	</v-card>

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

import MatchHistory from './MatchHistory.vue';
import BlockedUsers from './BlockedUsers.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: {
		Snackbar,
		DateViewer,
		UploadFile,
		MatchHistory,
		BlockedUsers,
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


.v-card {
	border: black solid thin;
	border-radius: 0;
	max-height: 93dvh;
	height: 93dvh;
	scroll-behavior: auto;
	overflow-y: scroll;
	overflow-x: hidden;
}
</style>
