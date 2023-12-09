<template>

	<h2>Discover Channels</h2>

	<div class="scrollable-content">

		<!-- Users list -->
		<v-list v-if="nonJoinedChannels.length">
			<v-list-item v-for="channel in nonJoinedChannels" :key="channel.id">
				{{ channel.name }}
				<v-btn @click="joinChannel(channel.name)">+</v-btn>
			</v-list-item>
		</v-list>

	</div>

	<!-- Search bar -->
	<v-col cols="9">
		<input
			v-model="searchTerm"
			@keyup.enter="searchChannels"
			placeholder="Search a channel..."
		/>
		<button @click="searchChannels">search</button>
	</v-col>
	<Snackbar></Snackbar>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';
import Snackbar from '../../layout/Snackbar.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: { Snackbar },
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
			nonJoinedChannels: [],
			pwd: '',
			showModal: false,
			selectedPrivChannel: '',
			searchTerm: '',
		};
	},
	beforeMount() {
		this.fetchNonJoinedChannels();
	},
	mounted() {},
	methods: {
		fetchNonJoinedChannels: async function() {
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
				this.nonJoinedChannels = await response.json();
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
					this.fetchNonJoinedChannels();
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
				this.fetchNonJoinedChannels();
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
					this.nonJoinedChannels = await response.json();
					console.log('searchChannels', this.nonJoinedChannels);
					this.searchTerm = '';
				} catch (error) {
					console.error(error);
				}
			} else {
				this.fetchNonJoinedChannels();
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
	z-index: 100;
}
.scrollable-content {
	max-height: 40vh;
	overflow-y: auto;
}

</style>