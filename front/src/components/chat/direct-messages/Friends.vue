<template>

	<v-container
	fluid
	fill-height
	>

		<!-- Friend list -->
		<v-card>
			<v-card-title>Friends</v-card-title>
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
		</v-card>
		
		<!-- Modal: friend profile -->
		<UserModal 
			v-if="showInfos"
			:userData="selectedFriend"
			:show="showInfos"
			@close="closeModal"/>

		<!-- Friend Requests list -->
		<v-card>
			<v-card-title>Friend Requests</v-card-title>
			<v-list v-if="friendRequests.length">
				<v-list-item v-for="request in friendRequests" :key="request.id">
					<template v-if="request.user_login == user.login">
						{{ request.target_display_name }}
						<v-btn @click="cancelRequest(request.target_login)">Cancel</v-btn>
					</template>
					<template v-else>
						{{ request.user_display_name }}
						<AcceptDeclineButton :login="request.user_login" :response="true" @respond="respondRequest"/>
						<AcceptDeclineButton :login="request.user_login" :response="false" @respond="respondRequest"/>
					</template>
				</v-list-item>
			</v-list>
		</v-card>

		<!-- Users list -->
		<v-card>
			<v-card-title>Discover Users</v-card-title>
			<v-list v-if="users.length">
				<v-list-item v-for="user in users" :key="user.id">
					{{ user.display_name }}
					<v-btn @click="sendFriendRequest(user.login)">+</v-btn>
				</v-list-item>
			</v-list>
		</v-card>

		<!-- Search bar -->
		<v-col>
			<v-text-field
				v-model="searchTerm"
				@keyup.enter="searchUsers"
				placeholder="Search a user..."
			/>
			<v-btn @click="searchUsers">search</v-btn>
		</v-col>

	</v-container>
	<!-- Error handling -->
	<Snackbar></Snackbar>

</template>

<script lang="ts">

import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

import Snackbar from '../../layout/Snackbar.vue';
import AcceptDeclineButton from '../utils/AcceptDeclineButton.vue';
import UserModal from '../utils/UserProfileModal.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: {
		Snackbar,
		AcceptDeclineButton,
		UserModal,
	},
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
			friendRequests: [],
			users: [],
			searchTerm: '',
			friends: [] as any,
			messages: '' as string,
			selectedFriend: null as any,
			showInfos: false as boolean,
		};
	},
	emits: ['messages-with'],
	beforeMount() {
		this.fetchFriends();
		this.fetchUsers();
		this.fetchFriendRequests();
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
 				this.selectedFriend = this.friends[0] ? this.friends[0] : null;
				this.messages = this.friends[0] ? this.friends[0].login : '';
				/*
				if (this.messages)
					this.$emit('messages-with', this.selectedFriend); */
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
			//this.$emit('messages-with', this.selected);
			this.showInfos = true;
		},
		closeModal() {
			this.showInfos = false;
		},
		displayMessagesWithFriend(login: string) {
			this.messages = login;
			this.$emit('messages-with', this.messages);
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
				this.selectedFriend = await response.json();
			} catch (error) {
				console.error(error);
			}
		},
		fetchFriendRequests: async function() {
			try {
				const response = await
				fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/requests`,
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
				this.friendRequests = await response.json();
			} catch (error) {
				console.error(error);
			}
		},
		respondRequest: async function(login: string, response: boolean) {
			try {
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/respond-request`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							login: login,
							response: response,
						}),
					}
				)
				.catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				this.fetchFriendRequests();
				this.fetchFriends();
			} catch (error) {
				console.log(error);
			}
		},
		cancelRequest: async function(target_login: string) {
			try {
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							login: target_login,
						}),
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				this.fetchFriendRequests();
				this.fetchUsers();
			} catch (error) {
				console.log(error);
			}
		},
		fetchUsers: async function() {
			try {
				const response = await
				fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/discover`,
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
				this.users = await response.json();
				console.log(this.users);
			} catch (error) {
				console.error(error);
			}
		},
		sendFriendRequest: async function(username: string) {
			try {
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/send-request`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							login: username,
						 }),
					}
				)
				.catch((error: any) => {
					console.log(error);
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				this.fetchUsers();
				this.fetchFriendRequests();
			} catch (error) {
				console.error(error);
			}
		},
		searchUsers: async function() {
			if (this.searchTerm.length) {
				try {
					const response = await
					fetch(`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/search/${this.searchTerm}`,
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
					this.users = await response.json();
					this.searchTerm = '';
				} catch (error) {
					console.error('Search error: ', error);
				}
			}
			else {
				this.fetchUsers();
			}
		},
	}
}
</script>
