<template>
	<div class="overlay">
		<div class="blocked-list-container">
			<h2>Blocked Users</h2>
			<ul class="no-bullets" v-if="blockedUsers.length">
				<li v-for="user in blockedUsers" :key="user.id">
					{{ user.display_name }} <!-- L'objet contient aussi l'avatar si tu veux -->
					<button @click="unblockUser(user.login)">Unblock</button>
				</li>
			</ul>
			<p v-else>~ u havent blocked anyone for now ~</p>
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
			blockedUsers: [],
		};
	},
	beforeMount() {
		this.fetchBlockedUsers();
	},
	mounted() {},
	methods: {
		unblockUser: async function (login: string) {
			try {
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/blocked`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							login: login,
						}),
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				this.fetchBlockedUsers();
			} catch (error) {
				console.error(error);
			}
		},
		fetchBlockedUsers: async function () {
			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/blocked`,
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
				this.blockedUsers = await response.json();
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>

<style scoped>
@font-face {
	font-family: 'OMORI_DISTURBED';
	src: url('/fonts/OMORI_GAME2.ttf') format('truetype-variations');
}

div {
	font-family: 'OMORI_DISTURBED';
}

h2 {
	font-family: 'OMORI_DISTURBED';
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
	padding-left: 0;
	margin-left: 0;
}

.blocked-list-container {
	background-color: rgb(0, 0, 0, 0.8);
	padding: 1rem;
	border-radius: 1rem;
	overflow: auto;
}
</style>
