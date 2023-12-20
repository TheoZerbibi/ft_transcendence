<template>

	<v-card flat class="ma-2" v-if="selectedUserLogin">

		<h3>About @{{ selectedUserLogin }}</h3>

		<v-avatar size="100%" class="ma-2"
			rounded="0"
			variant="flat">
			<v-img cover :src="friendData.avatar"></v-img>
		</v-avatar>

		<v-card-text>
			<v-card-subtitle>Name: {{ friendData.name }}</v-card-subtitle>
			<v-card-subtitle>Wins: {{ friendData.stats.wins }}</v-card-subtitle>
			<v-card-subtitle>Loses: {{ friendData.stats.loses }}</v-card-subtitle>
			<v-card-subtitle>Matches: {{ friendData.stats.matches }}</v-card-subtitle>
		</v-card-text>

		<v-card-actions class="flex-column justify-center align-end">
		<v-btn
			v-if="isFriend"
			flat
			rounded="0"
			:ripple="false"
			color="black"
			@click="deleteFriend"	
			text="Remove Friend">
		</v-btn>
		<v-btn
			flat
			rounded="0"
			:ripple="false" 
			color="red"
			@click="blockUser"	
			text="Block">
		</v-btn>
			
	</v-card-actions>

</v-card>

	<!-- <div v-else>
		<v-card-title>Profile</v-card-title>
		<v-card-text class="empty-card">
			~ click on a user to see their profile ! ~
		</v-card-text>
	</div> -->

	<!-- Error handling -->
	<Snackbar></Snackbar>

</template>

<script lang="ts">

import { computed, ref } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

import Snackbar from '../../layout/Snackbar.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: {
		Snackbar,
	},
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			user,
		};
	},
	props: {
		selectedUserLogin: String,
	},
	data() {
		return {
			friendLogin: '' as string,
			isFriend: false as boolean,
			friendData: {
				name: '' as string,
				avatar: '' as string,
				stats: {
					wins: 0 as number,
					loses: 0 as number,
					matches: 0 as number,
				},
			} as any,
		};
	},
	watch: {
		selectedUserLogin: function(newVal: string) {
			try {
				this.friendLogin = newVal;
				this.fetchFriendData();
			} catch (error) {
				console.log(error);
			}
		},
	},
	methods: {
		fetchFriendData: async function () {
			try {
				if (!this.friendLogin || this.friendLogin === '') {
					console.log('[fetchFriendData]: friendLogin is empty');
					return;
				}
				const isFriend: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/isfriend/${
						this.friendLogin
					}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					},
				);
				if (!isFriend.ok) {
					const error = await isFriend.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const isFriendData: any = await isFriend.json();
				this.isFriend = isFriendData.isFriend;
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/profile/${this.friendLogin}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
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

				this.friendData = {
					name: data.display_name,
					avatar: data.avatar,
					member_since: data.created_at,
					stats: {
						wins: data.stats.win,
						loses: data.stats.defeat,
						matches: data.stats.totalGame,
					},
				};
				console.log(this.friendData);

			} catch (error) {
				console.log(error);
			}
		},
		blockUser: async function() {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/block`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							login: this.friendLogin,
						}),
					}
				);

				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const data = await response.json();
				snackbarStore.showSnackbar(data.message, 3000, 'green');

			} catch (error) {
				console.log(error);
			}
		},
		deleteFriend: async function () {
			try {
				if (!this.isFriend) return;
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
							login: this.friendLogin,
						}),
					}
				);

				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}

				this.$emit('ask-refresh');
				this.fetchFriendData();

			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
	},
};

</script>

<style scoped>
.v-btn {
	border: black solid thin;
	width: 100%;
	margin-top: 1dvh;
	margin-bottom: 1dvh;
	display: flex;
	position: relative;
}

</style>
