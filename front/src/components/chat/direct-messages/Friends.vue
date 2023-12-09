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
	<UserModal v-if="showInfos" :selectedFriendLogin="selectedFriend" :show="showInfos" @close="closeModal"/>

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
			friends: [],
			selectedFriend: String,
			showInfos: false,
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
		displayProfile(infos_login: string) {
			this.selectedFriend = infos_login;
			this.showInfos = true;
		},
		closeModal() {
			this.showInfos = false;
		},
		displayMessagesWithFriend(login: string) {
			this.selectedFriend = login;
			this.$emit('friend-selected', this.selectedFriend);
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
