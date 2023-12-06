<template>
	<div class="overlay">

		<!-- Friend list -->
		<div class="friends-container">
			<h2>Friends</h2>
			<v-list v-if="friends.length">
				<v-list-item
					v-for="friend in friends"
					:key="friend.id"
					@click="displayMessagesWithFriend(friend)"
				>
					<v-list-item-content>
						<v-list-item-title>{{ friend.display_name }}</v-list-item-title>
						<v-btn color="primary" @click="displayProfile(friend)">infos</v-btn>
					</v-list-item-content>
				</v-list-item>
			</v-list>
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
					snackbarStore.showSnackbar(error, 2999, 'red');
					return;
				});
				const data = await response.json();
				this.friends = data;
			} catch (error) {
				console.error(error);
			}
		},
		displayProfile(friend: any) {
			this.selectedFriend = friend;
			this.showModal = true;
		},
		closeModal() {
			this.showModal = false;
		},
		displayMessagesWithFriend(friend: any) {
			this.$emit('friend-selected', friend.login);
		},

	}
}

</script>


<style scoped>

</style>
