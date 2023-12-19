<template>

	<!-- Users list -->
	<div class="ma-2">
		<h3>Discover Users</h3>
		<v-list v-if="users.length">
			<v-list-item 
				v-for="user in users" 
				density="compact"
				:ripple="false"
				:key="user.id"
				@click="userSelected(user.login)">
				
				<v-list-item-title>@{{ user.display_name }}</v-list-item-title>
				
				<template v-slot:append>
					<v-btn 
					flat 
					rounded="0"
					icon="fas fa-plus"
					density="compact"
					@click="sendFriendRequest(user.login)"
					:ripple="false">
				</v-btn>
			</template>
		</v-list-item>
		</v-list>
		<v-card-text v-else>~ no users except you ~</v-card-text>
	</div>
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
			selectedUserLogin: '' as string,
		};
	},

	props: {
		refresh: Number,
	},
	watch: {
		refresh: function() {
			this.fetchUsers();
		}
	},
	emits: ['user-selected', 'ask-refresh'],


	beforeMount() { this.fetchUsers(); },
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
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const data = await response.json();

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
				);
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}

				this.$emit('ask-refresh');
				this.fetchUsers();

			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		userSelected(login: string) {
			this.selectedUserLogin = login;
			this.$emit('user-selected', this.selectedUserLogin);
		},
	},
};

</script>