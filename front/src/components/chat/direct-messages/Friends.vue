<template>
	<div class="overlay">

		<!-- Friend list -->
		<div class="friends-container">
			<h2>Friends</h2>
			<ul v-if="friends.length">
				<li v-for="friend in friends" :key="friend.id" @click="selectFriend(friend)">
					<!-- <span class="online-badge" v-if="friend.isOnline"></span> -->
					{{ friend.display_name }}
				</li>
			</ul>
			<p v-else>~ sorry, no friends for now ~</p>
		</div>
		
		<!-- Modal: friend profile -->
	    <UserModal :user="selectedFriend" :show="showModal" @close="closeModal"/>
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
			selectedFriend: {},
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
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				const data = await response.json();
				this.friends = data;
			} catch (error) {
				console.error(error);
			}
		},
		selectFriend(friend: any) {
			this.selectedFriend = friend;
			this.showModal = true;
		},
		closeModal() {
			this.showModal = false;
		},

	}
}

</script>


<style scoped>

</style>
