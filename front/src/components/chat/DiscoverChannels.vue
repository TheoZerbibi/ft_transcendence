<template>
	<div class="overlay">

		<!-- Channels list -->
		 <div class="discover-channels-list-container">
			<h2>Discover Channels</h2>
			<ul class="no-bullets" v-if="discoverChannels.length">
				<li v-for="channel in discoverChannels" :key="channel.id">
					{{ channel.name }}
					<button @click="joinChannel(channel.name, channel.is_public)">+</button>
				</li>
			</ul>
			<p v-else>~ there is no channel to discover ~</p>
		</div>
		
		<!-- Search bar -->
		<div>
			<input type="text" v-model="searchTerm" placeholder="Search for a channel" />
			<button @click="searchChannels(searchTerm)">Search</button>
		</div>

		<!-- Modal -->
		<div class="modal" v-if="showModal">
			<h2>Enter Password</h2>
			<form @submit.prevent="joinPrivateChannel(pwd)">
				<input type="password" v-model="pwd" />
				<button type="submit">Submit</button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useUser } from '../../stores/user';
import { useSnackbarStore } from '../../stores/snackbar';

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
	data() {
		return {
			discoverChannels: [],
			pwd: '',
			showModal: false,
			selectedPrivChannel: '',
			searchTerm: '',
		};
	},
	beforeMount() {
		this.fetchDiscoverChannels();
	},
	mounted() {},
	methods: {
		fetchDiscoverChannels: async function() {
			try {
				const response = await
				fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/list/discover`,
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
				this.discoverChannels = await response.json();
			} catch (error) {
				console.error(error);
			}
		},
		joinChannel: async function(channel_name: string, is_public: boolean) {
			try {
				console.log(`${channel_name}: is_public = ${is_public}`);
				if (is_public) {
					await fetch(
						`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${channel_name}/join`,
						{
							method: 'POST',
							headers: {
								Authorization: `Bearer ${this.JWT}`,
								'Access-Control-Allow-Origin': '*',
							},
							body: JSON.stringify({
								chan_password: '',
							}),
						}
					).catch((error: any) => {
						snackbarStore.showSnackbar(error, 3000, 'red');
						return;
					});
					this.fetchDiscoverChannels();
				} else {
					this.selectedPrivChannel = channel_name;
					this.showModal = true;
				}
			} catch (error) {
				console.error(error);
			}
		},
		joinPrivateChannel: async function(pwd: string) {
			try {
				if (!pwd) {
					snackbarStore.showSnackbar('Please enter a password', 3000, 'red');
					return;
				}
				console.log(`${this.selectedPrivChannel}: user input pwd = ${pwd}`);
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.selectedPrivChannel}/join`,
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							chan_password: pwd,
						}),
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				this.selectedPrivChannel = '';
				this.showModal = false;
				this.fetchDiscoverChannels();
			} catch (error) {
				console.error(error);
			}
		},
		searchChannels: async function(searchTerm: string) {
			if (searchTerm.length) {
				try {
					const response = await
					fetch(
						`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/list/search/${searchTerm}`,
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
					this.discoverChannels = await response.json();
					console.log('searchChannels', this.discoverChannels);
					this.searchTerm = '';
				} catch (error) {
					console.error(error);
				}
			} else {
				this.fetchDiscoverChannels();
			}
		},
	}
}

</script>

<style scoped>

.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 1rem;
	border-radius: 0.5rem;
}

</style>