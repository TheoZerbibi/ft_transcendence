<template>
	<div class="user-search-container">
		<h2>Search for a user</h2>
		<v-text-field placeholder="Search for a user..." @input="searchUsers"></v-text-field>
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
			users: [],
		};
	},
	beforeMount() {
	},
	mounted() {},
	methods: {
		searchUsers: async function (searchTerm: string) {
			if (searchTerm.length >= 3) {
				try {
					const response = await fetch(
						`http://${import.meta.env.VITE_HOST}:${
							import.meta.env.VITE_API_PORT
						}/users/search/${searchTerm}`,
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
					this.users = await response.json();
					console.log(this.users);
				} catch (error) {
					console.error('Search error: ', error);
				}
			} else {
				users.value = [];
			}
		},
	},
};
</script>
