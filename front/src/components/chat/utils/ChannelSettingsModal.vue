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
						></v-text-field>

						<!-- Delete the Channel -->
						<v-btn color="red" @click="deleteChannel">Delete Channel</v-btn>

						<!-- Leave the Channel -->
						<v-btn color="orange" @click="leaveChannel">Leave Channel</v-btn>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="saveSettings">Save</v-btn>
					<v-btn color="grey darken-1" text @click="dialog = false">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {

	props: {
		selectedChannelName: {
			type: String,
			default: '',
		},
		show: Boolean,
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
			users: [], // This should be a list of users in the channel
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
				const response = await
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
				.catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				const channelInfos = await response.json();
				this.channelName = channelInfos.name;
				this.channelIsPublic = channelInfos.is_public;
				this.channelUpdatedAt = channelInfos.updated_at; // to watch
				this.fetchChannelUsersInfos();
			} catch (error) {
				console.error(error);
			}
		},
		fetchChannelUsersInfos: async function() {
			try {
				const response = await
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
				.catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				this.users = await response.json();
			} catch (error) {
				console.error(error);
			}
		},
/* 		toggleBan(user) {
			// Logic to ban or unban the user
		},
		kickUser(user) {
			// Logic to kick the user
		},
		muteUser(user) {
			// Logic to mute the user for the specified duration
		},
		saveSettings() {
			// Logic to save the settings
			this.dialog = false;
		},
		deleteChannel() {
			// Logic to delete the channel
		},
		leaveChannel() {
			// Logic to leave the channel
		}, */
	},
};
</script>

<style scoped>
/* Add your styles here */
</style>
