<template>

	<!-- Channel users list -->
	<v-card v-if="selectedChannelName">
		<v-card-title>
			Users in {{ selectedChannelName }}
		</v-card-title>
		<v-list v-if="channelUsers.length">
			<v-list-item
				v-for="channelUser in channelUsers"
				:key="channelUser.id"
			>
			{{ channelUser.display_name }}
			<UserModeration
				v-if="myChannelUserProfile.is_admin"
				:selectedChannelName="selectedChannelName"
				:selectedChannelUser="channelUser"
				:myUser="myChannelUserProfile">
			</UserModeration>
			</v-list-item>
		</v-list>
		<v-card-text v-else v-if="selectedChannelName">~ no one in this channel except you ~</v-card-text>
		<v-card-actions>
			<v-btn v-if="myChannelUserProfile.is_owner" @click="deleteChannel">Delete channel</v-btn>
			<v-btn v-if="!myChannelUserProfile.is_owner" @click="leaveChannel">Leave Channel</v-btn>
		<ChangePwd :selectedChannelName="selectedChannelName"></ChangePwd>
		</v-card-actions>"
	</v-card>

	<v-card v-else>
		<v-card-title>Users</v-card-title>
		<v-card-text class="empty-card">
			~ no channel selected ~
		</v-card-text>
	</v-card>

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
		channelName: String
	},
	computed: {
		selectedChannelName: function() {
			return this.channelName;
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
			channelUsers: [
				{
					"login": "seozcan",
					"display_name": "Semiha",
					"avatar": "https://cdn.intra.42.fr/users/d78eaeaafd38e03543f1c757ad8b070e/seozcan.jpg",
					"is_owner": true,
					"is_admin": true,
					"is_muted": null,
					"is_banned": false
				},
				{
					"login": "thzeribi",
					"display_name": "Theo",
					"avatar": "https://cdn.intra.42.fr/users/ef89183628c15b9229bf141ebd455ba9/thzeribi.jpg",
					"is_owner": false,
					"is_admin": false,
					"is_muted": null,
					"is_banned": false
				},
				{
					"login": "grannou",
					"display_name": "Gaëlle",
					"avatar": "https://cdn.intra.42.fr/users/c2b48b00d1529ccb8e7a4296ec23b8ee/grannou.jpg",
					"is_owner": false,
					"is_admin": false,
					"is_muted": null,
					"is_banned": false
				}
			],
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
		selectedChannelName: function(newVal: string) {
			//this.fetchUsers();
			this.fetchMyChannelUserProfile();
		}
	},
	methods: {
		fetchUsers: async function() {
			try {
				if (!this.selectedChannelName || this.selectedChannelName === '') {
					console.log('[fetchUsers]: channelName is empty');
					return;
				}
				console.log('[fetchUsers]: channelName: ', this.selectedChannelName);
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.selectedChannelName}/access/users`,
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

				console.log('[ChannelUsers:fetchUsers]: channelUsers: ', JSON.stringify(this.channelUsers));

			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		fetchMyChannelUserProfile: async function() {
			try {
				if (!this.selectedChannelName || this.selectedChannelName === '') {
					console.log('[fetchMyChannelUserProfile]: this.selectedChannelName is empty');
					return;
				}
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.selectedChannelName}/access/users/${this.user.login}`,
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

				console.log('[ChannelUsers:fetchMyChannelUserProfile]: channelUser: ', JSON.stringify(this.myChannelUserProfile));

			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},

		leaveChannel: async function() {
			try {
				if (!this.channelName || this.channelName === '') {
					console.log('[leaveChannel]: channelName is empty');
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
					console.log('[deleteChannel]: channelName is empty');
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
				const data: any = await response.json();
				snackbarStore.showSnackbar(data.message, 3000, 'green');

			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
	},
};

</script>
