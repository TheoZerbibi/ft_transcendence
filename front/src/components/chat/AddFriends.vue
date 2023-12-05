<template>
	<div class="overlay">

		<!-- Users list -->
		<div>
			<h2>Add friends</h2>
			<ul v-if="listFriendRequests.length">
				<li v-for="request in listFriendRequests" :key="request.id">
					{{ request.display_name }} <!-- L'objet contient aussi l'avatar si tu veux -->
					<button class="button-spacing" @click="respondRequest(request.login, true)">v</button>
					<button class="button-spacing" @click="respondRequest(request.login, false)">x</button>
				</li>
			</ul>
			<ul v-if="users.length">
				<li v-for="userElem in users" :key="userElem.id"> <!-- I call it "user elem" so we dont overlap the userStore.getUser that get the author of the request -->
					{{ userElem.display_name }}
					<button @click="sendFriendRequest(userElem.login)">+</button>
				</li>
			</ul>
			<p v-else>~ sorry, no users for now ~</p>
		</div>

		<!-- Search bar -->
		<div>
			<input type="text" v-model="searchTerm" placeholder="Search for a user" />
			<button @click="searchUsers(searchTerm)">Search</button>
		</div>
	</div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useUser } from '../../stores/user';
import { useSnackbarStore } from '../../stores/snackbar';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
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
					snackbarStore.showSnackbar(error, 3000, 'red');
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
					snackbarStore.showSnackbar(error, 3000, 'red');
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
					snackbarStore.showSnackbar(error, 3000, 'red');
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
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				console.log('Friend request sent to', username);
			} catch (error) {
				console.error(error);
			}
		},
		searchUsers: async function(searchTerm: string) {
			if (searchTerm.length) {
				try {
					const response = await
					fetch(`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/search/${searchTerm}`,
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
