<template>

	<!-- Users list -->
		<v-card-title >Discover Users</v-card-title>
		<v-list v-if="users.length">
			<v-list-item v-for="user in users" :key="user.id">
				{{ user.display_name }}
				<v-btn @click="sendFriendRequest(user.login)">+</v-btn>
			</v-list-item>
		</v-list>
		<v-card-text v-else>~ no users except you ~</v-card-text>
	<!-- Error handling -->
	<Snackbar></Snackbar>

</template>

<script lang="ts">

import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';
import Snackbar from '../../layout/Snackbar.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: { Snackbar, },
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
			users: [] as any[],
		};
	},
	beforeMount() {
		this.fetchUsers();
	},
	methods: {
 		fetchUsers: async function() {
			try {
				const response: any = await
				fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/discover`,
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
				this.users = data;
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		sendFriendRequest: async function(friendLogin: string) {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/send-request`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							login: friendLogin,
						 }),
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
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
	},
};

</script>