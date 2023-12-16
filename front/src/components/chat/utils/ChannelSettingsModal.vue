<template>
	<div class="overlay" v-if="show">
		<v-dialog v-model="dialog" persistent max-width="600px">
			<v-card>
				<v-card-title>Channel Settings</v-card-title>
				<v-card-text>
					<v-form>
						<!-- Change Channel's Name -->
						<v-text-field
							label="Change Channel Name"
							v-model="channelName"
							max-length="20"
						></v-text-field>

						<!-- Ban / Unban Channel User -->
						<v-select
							label="Ban / Unban User"
							:items="users"
							item-text="name"
							item-value="id"
							v-model="selectedUser"
							return-object
							@change="toggleBan"
						></v-select>

						<!-- Kick a Channel User -->
						<v-select
							label="Kick User"
							:items="users"
							item-text="name"
							item-value="id"
							@change="kickUser"
						></v-select>

						<!-- Mute a Channel User -->
						<v-select
							label="Mute User"
							:items="users"
							item-text="name"
							item-value="id"
							@change="muteUser"
						></v-select>
						<v-slider
							v-model="muteDuration"
							:max="60"
							step="1"
							label="Mute Duration (minutes)"
						></v-slider>

						<!-- Add / Change / Remove Password -->
						<v-text-field
							label="Channel Password"
							v-model="channelPassword"
							type="password"
							max-length="20"
						></v-text-field>

						<!-- Delete the Channel -->
						<v-btn color="red" @click="deleteChannel">Delete Channel</v-btn>

						<!-- Leave the Channel -->
						<v-btn color="orange" @click="leaveChannel">Leave Channel</v-btn>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="grey darken-1" text @click="dialog = false">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
	<Snackbar></Snackbar>
</template>

<script lang="ts">

import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';
import type { PropType } from 'vue';

import Snackbar from '../../layout/Snackbar.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

interface Types {
	selectedChannelName: string;
	show: boolean;
}

export default {
  components: { Snackbar },

	props: {
		selectedChannelName: String as PropType<Types['selectedChannelName']>,
		show: Boolean as PropType<Types['show']>,
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
			dialog: true,
			channelName: '',
			users: [],
			selectedUser: null,
			muteDuration: 0,
			channelPassword: '',
		};
	},
	beforeMount() {
		this.fetchChannelInfos();
	},
	methods: {
		fetchChannelInfos: async function() {
			try {
				const response: any = await
				fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.selectedChannelName}/access`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				)
				;
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				const data: any = await response.json();
				if (data.is_error) {
					snackbarStore.showSnackbar(data.error_message, 3000, 'red');
					return;
				}
				this.channelName = data.name;
				this.channelIsPublic = data.is_public;
				this.channelUpdatedAt = data.updated_at; // to watch
				this.fetchChannelUsersInfos();
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		fetchChannelUsersInfos: async function() {
			try {
				const response: any = await
				fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.selectedChannelName}/access/users`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				)
				;
				const data: any = await response.json();
				if (data.is_error) {
					snackbarStore.showSnackbar(data.error_message, 3000, 'red');
					return;
				}
				this.users = data;
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
/*
		toggleBan(user) {
			// Logic to ban or unban the user
		},
		kickUser(user) {
			// Logic to kick the user
		},
		muteUser(user) {
			// Logic to mute the user for the specified duration
		},
*/
		deleteChannel: async function() {
			try {
				const response: any = await
				fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.selectedChannelName}`,
					{
						method: 'DELETE',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				)
				;
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				const data: any = await response.json();
				if (data.is_error) {
					snackbarStore.showSnackbar(data.error_message, 3000, 'red');
					return;
				}
				snackbarStore.showSnackbar('Channel deleted', 3000, 'green');
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		leaveChannel: async function() {
			try {
				const channelName: string = this.selectedChannelName;
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${channelName}/leave`,
					{
						method: 'DELETE',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				)
				;
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				const data: any = await response.json();
				if (data.is_error) {
					snackbarStore.showSnackbar(data.error_message, 3000, 'red');
					return;
				}
				snackbarStore.showSnackbar('Channel left', 3000, 'green');
				//this.$emit('channel-left'); // TODO : emit event to refresh the channel list, messages etc
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
	},
};
</script>

<style scoped>
/* Add your styles here */
</style>
