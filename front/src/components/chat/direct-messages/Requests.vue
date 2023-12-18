<template>

	<!-- Friend Requests list -->
		<v-card-title>Friend Requests</v-card-title>

		<v-list v-if="requests.length">
			<v-list-item v-for="request in requests" :key="request.id" @click="userSelected(user.login)">

				<template v-if="request.user_login == user.login">
					{{ request.target_display_name }}
					<v-btn
						@click="cancelRequest(request.target_login)"
					>Cancel</v-btn>
				</template>

				<template v-else>
					{{ request.user_display_name }}
					<AcceptDeclineButton
						:login="request.user_login"
						:response="true"
						@respond="respondRequest"/>
					<AcceptDeclineButton
						:login="request.user_login"
						:response="false"
						@respond="respondRequest"/>
				</template>

			</v-list-item>
		</v-list>
		<v-card-text v-else>~ no pending friend requests ~</v-card-text>

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

import AcceptDeclineButton from '../utils/AcceptDeclineButton.vue';

export default {
	components: {
		Snackbar,
		AcceptDeclineButton,
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
			requests: [] as any,
			selectedUserLogin: '' as string,
		};
	},
	props: {
		refresh: Number,
	},
	watch: {
		refresh: function() {
			this.fetchRequests();
		}
	},
	emits: ['user-selected', 'ask-refresh'],

	beforeMount() { this.fetchRequests(); },

	methods: {
		fetchRequests: async function() {
			try {
				console.log(`[REQUESTS]: fetching requests of ${this.user.login}`);
				const response: any = await
				fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/requests`,
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

				this.requests = data;

			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		respondRequest: async function(login: string, choice: boolean) {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/respond-request`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							login: login,
							response: choice,
						}),
					}
				);

				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				this.$emit('ask-refresh');

			} catch (error) {
				console.log(error);
			}
		},
		cancelRequest: async function(target_login: string) {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							login: target_login,
						}),
					}
				);
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				this.$emit('ask-refresh');

			} catch (error) {
				console.log(error);
			}
		},
		userSelected(login: string) {
			this.selectedUserLogin = login;
			this.$emit('user-selected', this.selectedUserLogin);
		},
	},
};

</script>
