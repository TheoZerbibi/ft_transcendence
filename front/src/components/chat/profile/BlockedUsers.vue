<template>

	<!-- Blocked users list -->
	<v-card  class="d-flex align-center justify-center rounded-0 box">
	<v-card-title>Blocked Users</v-card-title>
		<v-list class="no-bullets" v-if="blockedUsers.length">
			<v-list-item v-for="user in blockedUsers" :key="user.id">
				{{ user.display_name }} <!-- L'objet contient aussi l'avatar si tu veux -->
				<v-btn @click="unblockUser(user.login)">x</v-btn>
			</v-list-item>
		</v-list>
		<v-card-text v-else>~ u havent blocked anyone for now ~</v-card-text>
	</v-card>

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
	components: {
		Snackbar,
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
			blockedUsers: [],
		};
	},
	beforeMount() {
		this.fetchBlockedUsers();
	},
	mounted() {},
	methods: {
		fetchBlockedUsers: async function () {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/blocked`,
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
				if (data.is_error) {
					snackbarStore.showSnackbar(data.error_message, 3000, 'red');
					return;
				}
				this.blockedUsers = data;
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		unblockUser: async function (login: string) {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/blocked`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							login: login,
						}),
					}
				);
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				const data: any = await response.json();
				if (data.is_error) {
					snackbarStore.showSnackbar(data.error_message, 3000, 'red');
					return;
				}
				this.fetchBlockedUsers();
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
	},
};
</script>
