<template>

	<!-- Channel users list -->
	<div class="ma-2" v-if="channelName">
		<h3>#{{ channelName }} settings</h3>
		Users:
		<v-list v-if="channelUsers.length">
			<v-list-item
				v-for="channelUser in channelUsers"
				color="black"
				density="compact"
				:key="channelUser.id"
				:ripple="false"
			>

			<v-list-item-title>{{ channelUser.display_name }}</v-list-item-title>

			<template v-slot:append>
				<UserModeration
					v-if="myChannelUserProfile.is_admin"
					:selectedChannelName="channelName"
					:selectedChannelUser="channelUser"
					:myUser="myChannelUserProfile">
				</UserModeration>
			</template>

			</v-list-item>
		</v-list>
		
		<v-card-text v-else-if="channelName">~ no one in this channel except you ~</v-card-text>
		
		<v-card-actions class="flex-column align-center justify-center">
			<ChangePwd 
				v-if="myChannelUserProfile.is_owner"
				:selectedChannelName="channelName">
			</ChangePwd>
			
			<v-btn flat
			rounded="0"
			style="border: black solid thin;"
			:ripple="false" 
			class="align-self-end"
			color="red"
			v-if="myChannelUserProfile.is_owner"
			@click="deleteChannel">Delete channel</v-btn>
			
			<v-btn 
			class="align-self-end"
			flat
			color="red"
			rounded="0"
			style="border: black solid thin;"
			:ripple="false"
			v-if="!myChannelUserProfile.is_owner"
			@click="leaveChannel">Leave Channel</v-btn>

		</v-card-actions>
	</div>

	<div v-else>
		<v-card-title>Users</v-card-title>
		<v-card-text class="empty-card">
			~ no channel selected ~
		</v-card-text>
	</div>

	<!-- Error handling -->
	<Snackbar></Snackbar>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';
import Snackbar from '../../layout/Snackbar.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

import UserModeration from './modals/UserModerationModal.vue';
import ChangePwd from './modals/ChangePwdModal.vue';

export default {
	components: {
		Snackbar,
		UserModeration,
		ChangePwd,
	},
	props: {
		selectedChannelName: String,
		refresh: Number,
	},
	computed: {
		channelName: function() {
			return this.selectedChannelName;
		}
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
			channelUsers: [] as any[],
			myChannelUserProfile: {
				"login": "nfauconn",
				"display_name": "Noemi",
				"avatar": "https://cdn.intra.42.fr/users/96c6292bd2445ca46c9ce03ddb6f8572/nfauconn.jpg",
				"is_owner": true,
				"is_admin": true,
				"is_muted": null,
				"is_banned": false
			}
		};
	},
	watch: {
		channelName: function() {
			this.fetchUsers();
			this.fetchMyChannelUserProfile();
		},
		refresh: function() {
			this.fetchUsers();
			this.fetchMyChannelUserProfile();
		}
	},
	methods: {
		fetchUsers: async function() {
			try {
				if (!this.channelName || this.channelName === '') {
					return;
				}
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.channelName}/access/users`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				);

				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const data = await response.json();

				this.channelUsers = data;

			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		fetchMyChannelUserProfile: async function() {
			try {
				if (!this.channelName || this.channelName === '') {
					return;
				}
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.channelName}/access/users/${this.user.login}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				)
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const data = await response.json();

				this.myChannelUserProfile = data;

			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},

		leaveChannel: async function() {
			try {
				if (!this.channelName || this.channelName === '') {
					return;
				}
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/leave`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							name: this.channelName,
						}),
					});

				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const data = await response.json();
				snackbarStore.showSnackbar(data.message, 3000, 'green');

			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},

		deleteChannel: async function() {
			try {
				if (!this.channelName || this.channelName === '') {
					return;
				}
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							name: this.channelName,
						}),
					}
				)
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const data = await response.json();
				snackbarStore.showSnackbar(data.message, 3000, 'green');

			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
	},
};

</script>

<style scoped>
.v-btn {
	border: black solid thin;
	width: 100%;
	margin-top: 1dvh;
	margin-bottom: 1dvh;
}
</style>
