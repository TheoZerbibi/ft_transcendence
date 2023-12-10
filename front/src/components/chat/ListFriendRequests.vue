<template>
	<div class="overlay">
		<div class="friend-requests-container">
			<h2>Friend Requests</h2>
			<ul class="no-bullets" v-if="ListFriendRequests.length">
				<li v-for="request in ListFriendRequests" :key="request.id">
					{{ request.display_name }} <!-- L'objet contient aussi l'avatar si tu veux -->
					<button class="button-spacing" @click="respondRequest(request.login, true)">v</button>
					<button class="button-spacing" @click="respondRequest(request.login, false)">X</button>
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
<<<<<<< HEAD
			friendRequests: [],
=======
			ListFriendRequests: []
>>>>>>> 75920e1 (feat: discover channel & joined channels)
		};
	},
	beforeMount() {
		this.fetchListFriendRequests();
	},
	mounted() {},
	methods: {
<<<<<<< HEAD
		fetchFriendRequests: async function () {
=======
		fetchListFriendRequests: async function() {
>>>>>>> 75920e1 (feat: discover channel & joined channels)
			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/requests`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					},
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				const data = await response.json();
				this.ListFriendRequests = data;
			} catch (error) {
				console.error(error);
			}
		},
<<<<<<< HEAD:front/src/components/chat/FriendRequestsList.vue
		acceptFriendRequest: async function (username: string) {
			try {
				await fetch(
<<<<<<< HEAD
					`http://${import.meta.env.VITE_HOST}:${
						import.meta.env.VITE_API_PORT
					}/users/friends/requests/${username}`,
=======
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/requests`,
>>>>>>> 0d4ed31 (feat(front & back): send friend request, body instead of url var)
=======
		respondRequest: async function(login: string, response: boolean) {
			try {
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/respond-request`,
>>>>>>> d4df5e1 (feat(front): accept or decline friend request):front/src/components/chat/ListFriendRequests.vue
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
<<<<<<< HEAD:front/src/components/chat/FriendRequestsList.vue
<<<<<<< HEAD
					},
=======
						body: JSON.stringify({ username }),
					}
>>>>>>> 0d4ed31 (feat(front & back): send friend request, body instead of url var)
				);
			} catch (error) {
				console.log(error);
				// TODO
			}
		},
		declineFriendRequest: async function (username: string) {
			try {
				await fetch(
<<<<<<< HEAD
					`http://${import.meta.env.VITE_HOST}:${
						import.meta.env.VITE_API_PORT
					}/users/friends/requests/${username}`,
=======
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/requests`,
>>>>>>> 0d4ed31 (feat(front & back): send friend request, body instead of url var)
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
<<<<<<< HEAD
					},
=======
						body: JSON.stringify({ username }),
					}
>>>>>>> 0d4ed31 (feat(front & back): send friend request, body instead of url var)
				);
			} catch (error) {
				console.log(error);
				// TODO
=======
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
>>>>>>> d4df5e1 (feat(front): accept or decline friend request):front/src/components/chat/ListFriendRequests.vue
			}
		},
	},
};
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
.button-spacing {
	margin-left: 1rem;
}
.friend-requests-container {
	position: absolute;
	top: 10%;
	left: 50%;
	margin: auto;
	background-color: rgb(0, 0, 0, 0.8);
	padding: 1rem;
	border-radius: 1rem;
	overflow: auto;
}
</style>
