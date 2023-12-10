<template>
	<div class="overlay">
		<div class="discover-users-container">
			<h2>Discover users</h2>
			<ul class="no-bullets" v-if="users.length">
				<li v-for="userElem in users" :key="userElem.id"> <!-- I call it "user elem" so we dont overlap the userStore.getUser that get the author of the request -->
					{{ userElem.display_name }}
					<button class="button-spacing" @click="sendFriendRequest(userElem.login)">+</button>
				</li>
			</ul>
			<p v-else>~ sorry, no users for now ~</p>
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
			users: []
		};
	},
	beforeMount() {
		this.fetchusers();
	},
	mounted() {},
	methods: {
		fetchusers: async function() {
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
	}
}
</script>

<style scoped>

</style>
