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
				<v-btn @click="displayProfile">infos</v-btn>
				</v-list-item>
			</v-list>
		<p v-else>~ sorry, no friends for now ~</p>
		</div>
	</div>
	
	<!-- Modal: friend profile -->
	<UserModal :user="friend_infos" :show="show_infos" @close="closeModal"/>
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
			login_messages: '',
			show_infos: false,
			friend_infos: {},
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
					snackbarStore.showSnackbar(error, 2999, 'red');
					return;
				});
				const data = await response.json();
				this.friends = data;
				this.login_messages = this.friends[0] || null;
			} catch (error) {
				console.error(error);
			}
		},
		displayProfile(friend: any) {
			this.friend_infos = friend;
			this.show_infos = true;
		},
		closeModal() {
			this.show_infos = false;
		},
		displayMessagesWithFriend(login: string) {
			this.login_messages = login;
			this.$emit('friend-selected', this.login_messages);
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
