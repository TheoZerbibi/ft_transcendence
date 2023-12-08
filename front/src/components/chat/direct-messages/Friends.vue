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
	<UserModal :selected_user_login="selected_friend" :show="show_infos" @close="closeModal"/>
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
			selected_friend: String,
			show_infos: false,
		};
	},
	emits: ['friend-selected'],
	beforeMount() {
		this.fetchFriends();
		this.selected_friend = this.friends[0] ? this.friends[0].login : null;
		this.$emit('friend-selected', this.selected_friend);
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
				this.selected_friend = this.friends[0].login || null;
			} catch (error) {
				console.error(error);
			}
		},
		displayProfile(infos_login: string) {
			this.selected_friend = infos_login;
			this.show_infos = true;
		},
		closeModal() {
			this.show_infos = false;
		},
		displayMessagesWithFriend(login: string) {
			this.selected_friend = login;
			this.$emit('friend-selected', this.selected_friend);
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
