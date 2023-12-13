<template>
	<!-- Friend list -->
	<div class="friends-container">
		<h2>Friends</h2>
		<div class="scrollable-content">
			<v-list v-if="friends.length">
				<v-list-item
					v-for="friend in friends"
					:key="friend.id"
					@click="displayMessagesWithFriend(friend.login)"
				>
				{{ friend.display_name }}
				<v-btn @click="displayProfile(friend.login)">infos</v-btn>
				</v-list-item>
			</v-list>
		<p v-else>~ sorry, no friends for now ~</p>
		</div>
	</div>
	
	<!-- Modal: friend profile -->
	<UserModal 
		v-if="showInfos"
		:userData="selectedFriend"
		:show="showInfos"
		@close="closeModal"/>

	<Snackbar></Snackbar>
</template>

<script lang="ts">

import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

import Snackbar from '../../layout/Snackbar.vue';
import UserModal from '../utils/UserProfileModal.vue';

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
	components: {
		Snackbar,
		UserModal,
	},
	data() {
		return {
			friends: [] as any,
			selectedLogin: '' as string,
			selectedFriend: null as any,
			showInfos: false as boolean,
		};
	},
	emits: ['friend-selected'],
	beforeMount() {
		this.fetchFriends();
	},
	mounted() {},
	methods: {
		fetchFriends: async function() {
			try {
				const response = await
				fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends`,
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
				this.friends = await response.json();
			} catch (error) {
				console.error(error);
			}
		},
		displayProfile(login: string) {
			this.selectedFriend = {
				"id": 5,
				"login": "seozcan",
				"display_name": "Semiha",
				"avatar": "https://cdn.intra.42.fr/users/d78eaeaafd38e03543f1c757ad8b070e/seozcan.jpg",
				"created_at": "2023-12-13T11:08:38.070Z",
				"last_login": "2023-12-13T11:08:38.070Z"
			};
			//this.fetchSelectedUserInfos(login);
			//this.$emit('friend-selected', this.selected);
			this.showInfos = true;
		},
		closeModal() {
			this.showInfos = false;
		},
		displayMessagesWithFriend(login: string) {
			this.selectedLogin = login;
			this.$emit('friend-selected', this.selectedLogin);
		},
		fetchSelectedUserInfos: async function(userLogin: string) {
			try {
				console.log("[UserProfileModal.vue:fetchSelectedUserInfos]" 
							+ "\nshow_modal: " + this.show 
							+ "\nselected_user_login: " + userLogin);
				if (!this.show || !userLogin || userLogin === '') {
					// TODO : display stg ?
					return;
				}
				const response: any = await fetch (
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/profile/${userLogin}`, 
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
				console.log("Friend.vue:fetchSelectedUserInfos] response: " + response);
				this.selectedFriend = await response.json();
			} catch (error) {
				console.error(error);
			}
		},
	}
}

</script>


<style scoped>

.scrollable-content {
	max-height: 40vh;
	overflow-y: auto;
}


</style>
