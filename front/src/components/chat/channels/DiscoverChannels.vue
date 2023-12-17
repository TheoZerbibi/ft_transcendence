<template>
	<!-- Non joined channels (discover)-->
	<v-card-title>Discover Channels</v-card-title>
	<v-list v-if="channels.length">
		<v-list-item v-for="channel in channels" :key="channel.id">
			{{ channel.name }}
			<template v-if="channel.is_public">
				<v-btn @click="joinPublicChannel(channel.name)">+</v-btn>
			</template>
			<template v-else>
				<v-btn @click="openPwdDialog(channel.name)">+</v-btn>
			</template>
		</v-list-item>
	</v-list>
	<v-card-text v-else>
		~ no channel available ~
	</v-card-text>

	<v-card-actions>
		<v-spacer></v-spacer>
		<v-btn @click="showNameModal">Create you own channel !</v-btn>
	</v-card-actions>


	<PwdModal class="modal" v-if="showPwdModal" :showModal="showPwdModal" @join-private-channel="joinPrivateChannel"
		@close-modal="showPwdModal = false" />

	<ChannelNameModal class="modal" v-if="showChannelNameModal" :showModal="showChannelNameModal"
		@create-channel="createChannel" @close-modal="showChannelNameModal = false" />

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
import ChannelNameModal from './CreateChannelModal.vue';

export default {
	components: {
		Snackbar,
		PwdModal,
		ChannelNameModal,
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
			newChannelName: '' as string,
			channels: [] as any[],
			showPwdModal: false as boolean,
			showChannelNameModal: false as boolean,
		};
	},
	beforeMount() {
		this.fetchChannels();
	},
	methods: {
		fetchChannels: async function () {
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
					;
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				const data: any = await response.json();
				if (data.is_error) {
					snackbarStore.showSnackbar(data.error_message, 3000, 'red');
					return;
				}
				this.channels = data;
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		createChannel: async function (newName: string) {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/create`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							name: newName,
						}),
					}
				);
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				const data: any = await response.json();
				if (data.is_error) {
					snackbarStore.showSnackbar(data.error_message, 3000, 'red');
					return;
				}
				this.fetchChannels();
				snackbarStore.showSnackbar(`Channel ${this.newChannelName} created`, 3000, 'green');
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		showNameModal() {
			this.showChannelNameModal = true;
		},
		joinPublicChannel: async function (channel_name: string) {
			try {
				if (channel_name === '') {
					return;
				}
				const response: any = await fetch(
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
				);
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				const data: any = await response.json();
				if (data.is_error) {
					snackbarStore.showSnackbar(data.error_message, 3000, 'red');
					return;
				}
				this.fetchChannels();
				snackbarStore.showSnackbar(`You joined ${channel_name}`, 3000, 'green');
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		openPwdDialog(channel_name: string) {
			this.selectedPrivChannel = channel_name;
			this.showPwdModal = true;
		},
		joinPrivateChannel: async function (pwd: string) {
			try {
				if (!pwd) {
					snackbarStore.showSnackbar('Please enter a password', 3000, 'red');
					return;
				}
				console.log(`${this.selectedPrivChannel}: user input pwd = ${pwd}`);
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.selectedPrivChannel}/join`,
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							chan_password: pwd as string,
						}),
					}
				);
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					this.selectedPrivChannel = '';
					this.showPwdModal = false;
					return;
				}
				const data: any = await response.json();
				if (data.is_error) {
					snackbarStore.showSnackbar(data.error_message, 3000, 'red');
					this.selectedPrivChannel = '';
					this.showPwdModal = false;
					return;
				}
				this.selectedPrivChannel = '';
				this.showPwdModal = false;
				this.fetchChannels();
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
				this.selectedPrivChannel = '';
				this.showPwdModal = false;
			}
		},
	},
}

</script>
