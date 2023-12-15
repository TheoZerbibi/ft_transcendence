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
			<v-btn @click="modUser('kick')" >Kick </v-btn>
			</v-list-item>
		</v-list>
		<v-card-text v-else v-if="selectedChannelName">~ no one in this channel except you ~</v-card-text>
	</v-card>

	<v-card v-else>
		<v-card-title>Users</v-card-title>
		<v-card-text class="empty-card">
			~ no channel selected ~
		</v-card-text>
	</v-card>

	<!-- Channel Settings -->

	<v-card v-if="selectedChannelName">
		<v-card-title> Settings </v-card-title>

		<v-card-text>
			<!-- Password modification -->
			<v-text-field
				v-model="pwd.prev"
				label="Prev Password"
				type="password"
			></v-text-field>
			<v-text-field
				v-model="pwd.new"
				label="New Password"
				type="password"
			></v-text-field>
			<v-text-field
				v-model="pwd.confirm"
				label="Confirm Password"
				type="password"
			></v-text-field>
			<v-btn @click="changePassword">Change Password</v-btn>
		</v-card-text>
		<v-card-actions>
			<v-btn @click="leaveChannel">Leave Channel</v-btn>
			<v-btn @click="deleteChannel">Delete Channel</v-btn>
		</v-card-actions>
	</v-card>

	<v-card v-else>
		<v-card-title>Settings</v-card-title>
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

export default {
	components: {
		Snackbar,
	},
	props: {
		selectedChannelName: String
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
			channelName: this.selectedChannelName ? this.selectedChannelName : '' as string,
			channelUsers: [] as any[],
			pwd: {
				prev: '' as string,
				new: '' as string,
				confirm: '' as string,
			},
			modUser: {
				action: '' as string,
			},
		};
	},
	watch: {
		selectedChannelName: function(newVal: string) {
			this.channelName = newVal;
			this.fetchUsers();
		}
	},
	methods: {
		fetchUsers: async function() {
			try {
				if (!this.channelName || this.channelName === '') {
					console.log('[fetchUsers]: channelName is empty');
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
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				this.channelUsers = await response.json();
			} catch (error) {
				console.error(error);
			}
		},
		leaveChannel: async function() {
			try {
				if (!this.channelName || this.channelName === '') {
					console.log('[leaveChannel]: channelName is empty');
					return;
				}
				await fetch(
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
					}).catch((error: any) => {
						snackbarStore.showSnackbar(error.message, 3000, 'red');
						return;
					}
				);
				snackbarStore.showSnackbar(`You left ${this.channelName}`, 3000, 'green');
			} catch (error) {
				console.error(error);
			}
		},
		deleteChannel: async function() {
			try {
				if (!this.channelName || this.channelName === '') {
					console.log('[deleteChannel]: channelName is empty');
					return;
				}
				await fetch(
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
				).catch((error: any) => {
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				});
			} catch (error) {
				console.error(error);
			}
		},
		changePassword: async function() {
			try {
				if (!this.channelName || this.channelName === '') {
					console.log('[changePassword]: channelName is empty');
					return;
				}
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.channelName}/settings/owner/pwd`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							prev_pwd: this.pwd.prev,
							new_pwd: this.pwd.new,
							new_pwd_confirm: this.pwd.confirm,
						}),
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				});
			} catch (error) {
				console.error(error);
			}
		},
		modUser: async function(actionOnUser: string) {
			try {
				if (!this.channelName || this.channelName === '') {
					console.log('[modUser]: channelName is empty');
					return;
				}
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.channelName}/settings/admin/mod_user`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							user: this.channelUser.display_name,
						}),
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				});
			} catch (error) {
				console.error(error);
			}
		},
	},
};

</script>
