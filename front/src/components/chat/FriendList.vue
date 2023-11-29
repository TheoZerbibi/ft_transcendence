<template>
	<div>
		<h2>Friend Requests</h2>
		<ul v-if="friendRequests.length">
			<li v-for="request in friendRequests" :key="request.id">
				{{ request.author_username }} <!-- L'objet contient aussi l'avatar si tu veux -->
				<button @click="acceptFriendRequest(request.id)">Accept</button>
				<span>&nbsp;</span>
				<button @click="declineFriendRequest(request.id)">Decline</button>
			</li>
		</ul>
		<p v-else>~ sorry, no friend request for now ~</p>
	</div>
</template>

<script>
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
				const route = useRoute();
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
			}
		},
	}
}
</script>
