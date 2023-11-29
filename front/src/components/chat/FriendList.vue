<template>
	<div>
		<h2>Friend Requests</h2>
		<ul v-if="friendRequests.length">
			<li v-for="request in friendRequests" :key="request.id">
				{{ request.author_username }} <!-- L'objet contient aussi l'avatar si tu veux -->
				<button @click="acceptFriendRequest(request.author_username)">Accept</button>
				<button @click="declineFriendRequest(request.author_username)">Decline</button>
			</li>
		</ul>
		<p v-else>~ sorry, no friend request for now ~</p>
	</div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useSnackbarStore } from '../../stores/snackbar';
import { useUser } from '../../stores/user';
import { useSocketStore } from '../../stores/websocket';
import Snackbar from '../layout/Snackbar.vue';

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
			friendRequests: []
		};
	},
	beforeMount() {
		this.fetchFriendRequests();
	},
	mounted() {},
	methods: {
		fetchFriendRequests: async function() {
			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/requests`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				);
				if (!response.ok) {
					console.error('error');
					// TODO
				}
				const data = await response.json();
				this.friendRequests = data;
				console.log(data);
			} catch (error) {
				console.log(error);
				// TODO
			}
		},
		acceptFriendRequest: async function(username: string) {
			try {
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/requests/${username}`,
					{
						method: 'PATCH',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				);

			} catch (error) {
				console.log(error);
				// TODO
			}
		},
		declineFriendRequest: async function(username: string) {
			try {
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/requests/${username}`,
					{
						method: 'DELETE',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				);

			} catch (error) {
				console.log(error);
				// TODO
			}
		},
	}
}
</script>
