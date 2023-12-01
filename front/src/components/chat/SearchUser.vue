<template>
	<div class="overlay">
		<div class="user-search-container">
			<input
				type="text"
				placeholder="Search for a user..."
				v-model="searchTerm"
				@input="searchUsers"
			/>
			<ul v-if="users.length">
				<li v-for="user in users" :key="user.id">
					{{ user.display_name }}
				</li>
			</ul>
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
		this.fetchUsers();
	},
	mounted() {},
	methods: {
		searchUsers: async function(searchTerm: string) {
			if (searchTerm.length >= 3) {
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
					console.log(this.users);
				} catch (error) {
					console.error('Erreur lors de la recherche:', error);
				}
			} else {
				users.value = [];
			}
		}
	}
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

.user-search-container {
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