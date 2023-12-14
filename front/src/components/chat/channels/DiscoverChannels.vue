<template>

	<!-- Non joined channels (discover)-->
	<v-card>
		<v-card-title>Discover Channels</v-card-title>
		<v-list v-if="channels.length">
			<v-list-item v-for="channel in channels" :key="channel.id">
				{{ channel.name }}
				<v-btn @click="joinChannel(channel.name, channel.is_public)">+</v-btn>
			</v-list-item>
		</v-list>
	</v-card>

	<PwdModal
		v-if="showModal"
		@join-private-channel="joinPrivateChannel"
		@close-modal="showModal = false"
	/>

	<!-- Error handling -->
	<Snackbar></Snackbar>

</template>

<script lang="ts">

import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';
import Snackbar from '../../layout/Snackbar.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

import PwdModal from './PwdModal.vue';

export default {
	components: { 
		Snackbar,
		PwdModal,
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
			channels: [] as any[],
			showModal: false as boolean,
		};
	},
	beforeMount() {
		this.fetchChannels();
	},
	methods: {
		fetchChannels: async function() {
			try {
				const response: any = await
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
				this.channels = await response.json();
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
					this.fetchChannels();
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
				this.fetchChannels();
			} catch (error) {
				console.error(error);
			}
		},
		searchChannels: async function(searchTerm: string) {
			if (searchTerm.length) {
				try {
					const response: any = await
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
					this.channels = await response.json();
					console.log('searchChannels', this.channels);
					this.searchTerm = '';
				} catch (error) {
					console.error(error);
				}
			} else {
				this.fetchChannels();
			}
		},
	}
}

</script>
