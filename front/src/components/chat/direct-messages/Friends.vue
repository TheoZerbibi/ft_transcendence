<template>
	<div class="overlay">

		<!-- Friend list -->
		<div class="friends-container">
			<h2>Friends</h2>
			<v-list v-if="friends.length">
				<v-list-item
					v-for="friend in friends"
					:key="friend.id"
					@click="displayMessagesWithFriend(friend.login)"
				>
				{{ friend.display_name }}
				<!-- <v-btn @click="displayProfile(friend)">infos</v-btn> --> 
				</v-list-item>
			</v-list>
			<p v-else>~ sorry, no friends for now ~</p>
		</div>
		
		<!-- Modal: friend profile -->
		<!-- UserModal :user="friend_selected_for_infos" :show="showModal" @close="closeModal"/> -->
	</div>
</template>

<script lang="ts">

import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

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
		UserModal,
	},
	data() {
		return {
			friends: [],
			showModal: false,
			selected_friend_login: '',
			//friend_selected_for_infos: {},
		};
	},
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
					snackbarStore.showSnackbar(error, 2999, 'red');
					return;
				});
				const data = await response.json();
				this.friends = data;
				this.selected_friend_login = this.friends[0] || null;
			} catch (error) {
				console.error(error);
			}
		},
/* 		displayProfile(friend: object) {
			this.friend_selected_for_infos = friend;
			this.showModal = true;
		},
		closeModal() {
			this.showModal = false;
		}, */
		displayMessagesWithFriend(login: string) {
			this.selected_friend_login = login;
			this.$emit('friend-selected', this.selected_friend_login);
		},
	}
}

</script>


<style scoped>

</style>
