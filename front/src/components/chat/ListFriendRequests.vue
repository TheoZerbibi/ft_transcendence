<template>
	<div class="overlay">
		<div class="friend-requests-container">
			<h2>Friend Requests</h2>
			<ul class="no-bullets" v-if="ListFriendRequests.length">
				<li v-for="request in ListFriendRequests" :key="request.id">
					{{ request.display_name }} <!-- L'objet contient aussi l'avatar si tu veux -->
					<button class="button-spacing" @click="respondRequest(request.login, true)">v</button>
					<button class="button-spacing" @click="respondRequest(request.login, false)">x</button>
				</li>
			</ul>
			<p v-else>~ no friend request here ~</p>
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
			ListFriendRequests: []
		};
	},
	beforeMount() {
		this.fetchListFriendRequests();
	},
	mounted() {},
	methods: {
		fetchListFriendRequests: async function() {
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
				this.ListFriendRequests = data;
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
				this.fetchListFriendRequests();
			} catch (error) {
				console.log(error);
			}
		},
	}
}
</script>

<style scoped>

</style>
