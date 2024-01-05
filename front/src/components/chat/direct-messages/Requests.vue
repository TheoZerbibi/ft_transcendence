<template>
	<!-- Friend Requests list -->
	<div class="ma-2">
		<h3>Friend Requests</h3>

		<v-list v-if="requests.length">
			<v-list-item 
				v-for="request in requests"
				color="black"
				density="compact"
				:ripple="false"
				:key="request.id">
				
				<v-list-item-title v-if="request.user_login == user.login" @click="userSelected(request.target_login)">
					@{{ request.target_display_name }}
				</v-list-item-title>

				<v-list-item-title v-else @click="userSelected(request.user_login)">
					@{{ request.user_display_name }}
				</v-list-item-title>

				<template v-slot:append >
					<div v-if="request.user_login == user.login">
						<v-btn 
							flat 
							rounded="0"
							icon="fas fa-close"
							density="compact"
							@click="cancelRequest(request.target_login)"
							:ripple="false">
						</v-btn>
					</div>
					<div v-else>
						<AcceptDeclineButton :login="request.user_login" :response="true" @respond="respondRequest" />
						<AcceptDeclineButton :login="request.user_login" :response="false" @respond="respondRequest" />
					</div>
				</template>

			</v-list-item>
		</v-list>

		<v-card-text v-else>~ no pending friend requests ~</v-card-text>
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
		refresh: function () {
			this.fetchRequests();
		}
	},
	emits: ['user-selected', 'ask-refresh'],

	beforeMount() { this.fetchRequests(); },

	methods: {
		fetchRequests: async function () {
			try {
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
		respondRequest: async function (login: string, choice: boolean) {
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
				snackbarStore.showSnackbar('Error during respond.', 3000, 'red');
			}
		},
		cancelRequest: async function (target_login: string) {
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
				snackbarStore.showSnackbar('Error during friend remove.', 3000, 'red');
			}
		},
		userSelected(login: string) {
			this.selectedUserLogin = login;
			this.$emit('user-selected', this.selectedUserLogin);
		},
	},
};

</script>
