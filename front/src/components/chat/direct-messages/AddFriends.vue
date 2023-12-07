<template>
	<div class="overlay">

		<h2>Add Friends</h2>

		<!-- Friend Requests list -->
		<v-list v-if="listFriendRequests.length">
			<v-list-item v-for="request in listFriendRequests" :key="request.id">
				{{ request.display_name }}
				<AcceptDeclineButton :login="request.login" :response="true" @respond="respondRequest"/>
				<AcceptDeclineButton :login="request.login" :response="false" @respond="respondRequest"/>
			</v-list-item>
		</v-list>

		<v-divider></v-divider>

		<!-- Users list -->
		<v-list v-if="users.length">
			<v-list-item v-for="user in users" :key="user.id">
				{{ user.display_name }}
				<v-btn @click="sendFriendRequest(user.login)">+</v-btn>
			</v-list-item>
		</v-list>

		<!-- Search bar -->
 		<!-- clearable = y a une croix a droite pour clear l'input mais jsp comment la rendre visible-->
		<v-col cols="9">
			<v-text-field
			 	v-model="searchTerm"
				placeholder="Search a user..."
				clearable
			></v-text-field>
		</v-col>
		<v-col cols="0">
			<v-btn @click="searchUsers">search</v-btn>
		</v-col>
	</div>
</template>

<script lang="ts">

import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';
import AcceptDeclineButton from '../utils/AcceptDeclineButton.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: {
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
			listFriendRequests: [],
			users: [],
			searchTerm: '',
		};
	},
	beforeMount() {
		this.fetchUsers();
		this.fetchlistFriendRequests();
	},
	mounted() {},
	methods: {
		fetchlistFriendRequests: async function() {
			try {
				const response = await
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
				.catch((error: any) => {
					snackbarStore.showSnackbar(error, 2999, 'red');
					return;
				});
				const data = await response.json();
				this.listFriendRequests = data;
			} catch (error) {
				console.error(error);
			}
		},
		respondRequest: async function(login: string, response: boolean) {
			try {
				await fetch(
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
							response: response,
						}),
					}
				)
				.catch((error: any) => {
					snackbarStore.showSnackbar(error, 2999, 'red');
					return;
				});
				this.fetchlistFriendRequests();
			} catch (error) {
				console.log(error);
			}
		},
		fetchUsers: async function() {
			try {
				const response = await
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
				.catch((error: any) => {
					snackbarStore.showSnackbar(error, 2999, 'red');
					return;
				});
				const data = await response.json();
				this.users = data;
				console.log(this.users);
			} catch (error) {
				console.error(error);
			}
		},
		sendFriendRequest: async function(username: string) {
			try {
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/send-request`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							login: username,
						 }),
					}
				)
				.catch((error: any) => {
					console.log(error);
					snackbarStore.showSnackbar(error, 2999, 'red');
					return;
				});
				console.log('Friend request sent to', username);
				this.fetchUsers();
			} catch (error) {
				console.error(error);
			}
		},
		searchUsers: async function() {
			if (this.searchTerm.length) {
				try {
					const response = await
					fetch(`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/search/${this.searchTerm}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
					).catch((error: any) => {
						snackbarStore.showSnackbar(error, 2999, 'red');
						return;
					});
					this.users = await response.json();
					this.searchTerm = '';
				} catch (error) {
					console.error('Search error: ', error);
				}
			}
			else {
				this.fetchUsers();
			}
		},
	}
}
</script>

<style scoped>

</style>
