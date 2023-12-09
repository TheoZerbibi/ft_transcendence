<template>

	<!-- Joined Channels list -->
	<div class="joinedChannels-container">
		<h2>Joined Channels</h2>
		<div class="scrollable-content">
			<v-list v-if="joinedChannels.length">
				<v-list-item
					v-for="channel in joinedChannels"
					:key="channel.id"
					@click="displayMessagesOfChannel(channel.name)"
				>
				{{ channel.name }}
				<v-btn @click="displaySettings(channel.name)">infos</v-btn>
				</v-list-item>
			</v-list>
		<p v-else>~ sorry, no joinedChannels for now ~</p>
		</div>
	</div>
	
	<!-- Modal: channel settings -->
	<ChannelSettingsModal v-if="showInfos" :selectedChannelName="selectedChannel" :show="showInfos" @close="closeModal"/>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

import ChannelSettingsModal from '../utils/ChannelSettingsModal.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: {
		ChannelSettingsModal,
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
			joinedChannels: [],
			selectedChannel: '',
			showInfos: false
		};
	},
	emits: ['channel-selected'],
	beforeMount() {
		this.fetchJoinedChannels();
	},
	mounted() {},
	methods: {
		fetchJoinedChannels: async function() {
			try {
				const response = await
				fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/list/joined`,
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
				if (data.error) {
					snackbarStore.showSnackbar(data.error, 3000, 'red');
					return;
				}
				this.joinedChannels = data;
				console.log(this.joinedChannels);
			} catch (error) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		displaySettings: function(channel_name: string) {
			console.log('displaySettings');
			this.selectedChannel = channel_name;
			this.showInfos = true;
			this.$emit('channel-selected', channel_name);
		},
		closeModal() {
			this.showInfos = false;
		},
		displayMessagesOfChannel: function(channel_name: string) {
			console.log('displayMessagesOfChannel');
			this.selectedChannel = channel_name;
			this.$emit('channel-selected', channel_name);
		},
	}
}
</script>

<style scoped>

</style>