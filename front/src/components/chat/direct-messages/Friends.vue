<template>
	<!-- Friend list -->
	<v-card-title>Friends</v-card-title>
	<v-list v-if="friends.length">
		<v-list-item v-for="friend in friends" :key="friend.id" @click="userSelected(friend.login)">
			{{ friend.display_name }}
		</v-list-item>
	</v-list>
	<v-card-text v-else>~ you didn't make friends for now ~</v-card-text>

	<!-- Error handling -->
	<Snackbar></Snackbar>
</template>

<script lang="ts">

import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';
import Snackbar from '../../layout/Snackbar.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {

	components: { Snackbar, },

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
			friends: [] as any,
			selectedUserLogin: '' as string,
			showInfos: false as boolean,
		};
	},

	emits: ['user-selected'],

	beforeMount() { this.fetchFriends(); },

	methods: {

		fetchFriends: async function () {
			try {
				const response: any = await
				fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				);

				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const data = await response.json();

				this.friends = data;

 				this.selectedUserLogin = this.friends[0] ? this.friends[0].login : '';
				this.$emit('user-selected', this.selectedUserLogin);

			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},

		userSelected(login: string) {
			this.selectedUserLogin = login;
			this.$emit('user-selected', this.selectedUserLogin);
		},
	}
}
</script>
