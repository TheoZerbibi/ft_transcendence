<template>
	<!-- Friend list -->
	<div class="ma-2">
		<h3>Friends</h3>
		<v-list v-if="friends.length">
			<v-list-item 
				v-for="friend in friends" 
				color="black" 
				density="compact"
				:ripple="false"
				:key="friend.id"
				@click="userSelected(friend.login)">
				<v-list-item-title>
					@{{ friend.display_name }}
				</v-list-item-title>

				<template v-slot:append>
					<v-btn 
						flat 
						rounded="0"
						icon="fas fa-gamepad"
						density="compact"
						:ripple="false"
						@click="deleteFriend(friend.login)">
					</v-btn>
				</template>
			</v-list-item>
		</v-list>

		<v-card-text v-else>~ you didn't make friends for now ~</v-card-text>
	</div>
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

	props: {
		refresh: Number,
	},
	watch: {
		refresh: function () {
			this.fetchFriends();
		}
	},

	emits: ['user-selected', 'ask-refresh'],

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
		deleteFriend: async function (userlogin: string) {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							login: userlogin,
						}),
					}
				);

				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}

				this.$emit('ask-refresh');
				this.fetchFriends();

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
