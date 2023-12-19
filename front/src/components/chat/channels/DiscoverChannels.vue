<template>
	<!-- Non joined channels (discover)-->
	<div class="ma-2">
		<h3>Discover Channels</h3>
		<v-list v-if="channels.length">
			<v-list-item 
				v-for="channel in channels" 
				density="compact"
				:key="channel.id" 
				:ripple="false"
				@click="channelSelected(channel.name)">

				<v-list-item-title>{{ channel.name }}</v-list-item-title>
				<template v-slot:append>
					<v-btn 
						flat 
						rounded="0"
						icon="fas fa-plus"
						density="compact"
						@click="channel.is_public ? joinPublicChannel(channel.name) : openPwdDialog(channel.name)"
						:ripple="false">
					</v-btn>
				</template>
			</v-list-item>
		</v-list>
		<v-card-text v-else>
			~ no channel available ~
		</v-card-text>
		
		<v-btn 
			flat
			rounded="0"
			style="border: black solid thin;"
			:ripple="false"
			@click="showNameModal">Create you own channel!</v-btn>
	</div>


	<PwdModal 
		class="modal"
		v-if="showPwdModal"
		:showModal="showPwdModal"
		@join-private-channel="joinPrivateChannel"
		@close-modal="showPwdModal = false" />

	<ChannelNameModal 
		class="modal"
		v-if="showChannelNameModal"
		:showModal="showChannelNameModal"
		@create-channel="createChannel"
		@close-modal="showChannelNameModal = false" />

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

import PwdModal from './modals/EnterPwdModal.vue';
import ChannelNameModal from './modals/ChannelNameModal.vue';

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
	props: {
		refresh: Number,
	},
	watch: {
		refresh: function() {
			this.fetchChannels();
		}
	},
	emits: ['ask-refresh'],
	data() {
		return {
			selectedChannel: '' as string,
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
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const data = await response.json();

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
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					this.showChannelNameModal = false;
					return;
				}
				this.showChannelNameModal = false;
				this.$emit('ask-refresh');
				this.fetchChannels();

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
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}

				this.$emit('ask-refresh');
				this.fetchChannels();

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
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							chan_password: pwd as string,
						}),
					}
				);
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					this.selectedPrivChannel = '';
					this.showPwdModal = false;
					return;
				}
				this.$emit('ask-refresh');
				this.selectedPrivChannel = '';
				this.showPwdModal = false;

				this.fetchChannels();

			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
				this.selectedPrivChannel = '';
				this.showPwdModal = false;
			}
		},
		channelSelected(channel_name: string) {
			this.selectedChannel = channel_name;
			this.$emit('channel-selected', this.selectedChannel);
		},
	},
}

</script>
