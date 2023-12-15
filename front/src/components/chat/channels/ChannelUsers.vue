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
			<v-btn @click="modUser('kick', channelUser.login)" >Kick </v-btn>
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
				const data: any = response.json();
				if (data.is_error) {
					snackbarStore.showSnackbar(data.error_message, 3000, 'red');
					return;
				}
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				this.channelUsers = data;
			} catch (error) {
				console.error(error);
			}
		},
		modUser: async function(actionToDo: string, login: string) {
			try {
				if (!this.channelName || this.channelName === '') {
					console.log('[modUser]: channelName is empty');
					return;
				}
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.channelName}/settings/admin/mod_user`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							target_login: login,
							action: actionToDo,
						}),
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				});
				const data: any = response.json();
				if (data.is_error) {
					snackbarStore.showSnackbar(data.error_message, 3000, 'red');
					return;
				}
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
			} catch (error) {
				console.error(error);
			}
		},
	},
};

</script>
