<template>
	<div class="overlay">
		<div class="friend-requests-container">
			<h2>Friend Requests</h2>
			<ul class="no-bullets" v-if="friendRequests.length">
				<li v-for="request in friendRequests" :key="request.id">
					{{ request.display_name }} <!-- L'objet contient aussi l'avatar si tu veux -->
					<button @click="acceptFriendRequest(request.login)">Accept</button>
					<button @click="declineFriendRequest(request.login)">Decline</button>
				</li>
			</ul>
			<p v-else>~ sorry, no friend request for now ~</p>
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
				this.friendRequests = data;
			} catch (error) {
				console.error(error);
			}
		},
		acceptFriendRequest: async function(username: string) {
			try {
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/requests`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({ username }),
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
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/requests`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({ username }),
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

<style scoped>

@font-face {
	font-family: 'OMORI_MAIN';
	src: url('/fonts/OMORI_GAME.ttf') format('truetype-variations');
}
div {
	font-family: 'OMORI_MAIN';
}
h2 {
	font-family: 'OMORI_MAIN', sans-serif;
	font-size: xx-large;
	text-align: center;
	color: rgb(65, 37, 37);
	text-shadow:
		1px 1px 2px plum,
		0 0 1em rgb(255, 123, 255),
		0 0 0.2em rgb(255, 255, 255);
}
.no-bullets {
	list-style-type: none;
}
.friend-requests-container {
	position: absolute;
	top: 10%;
	left: 5%;
	margin: auto;
	background-color: rgb(0, 0, 0, 0.8);
	padding: 1rem;
	border-radius: 1rem;
	overflow: auto;
}
</style>
