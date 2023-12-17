<template>

	<!-- Joined Channels list -->
	<v-card  class="d-flex align-center justify-center rounded-0 box">
		<v-card-title>Joined Channels</v-card-title>
		<v-list v-if="joinedChannels.length">
			<v-list-item
				v-for="channel in joinedChannels"
				:key="channel.id"
				@click="displayMessagesOfChannel(channel.name)"
			>
			{{ channel.name }}
			</v-list-item>
		</v-list>
		<v-card-text v-else>~ u didn't join any channels for now ~</v-card-text>
	</v-card>
	
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

export default {

	components: { Snackbar, },

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
			joinedChannels: [] as any[],
			selectedChannelName: '' as string,
			showInfos: false as boolean,
		};
	},

	emits: ['channel-selected'],

	beforeMount() {
		this.fetchJoinedChannels();
	},

	methods: {
		fetchJoinedChannels: async function() {
			try {
				const response: any = await
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
				this.joinedChannels = data;
				if (this.joinedChannels.length > 0) {
					this.selectedChannelName = this.joinedChannels[0].name;
					this.$emit('channel-selected', this.selectedChannelName);
				}
			} catch (error: any) {
				console.error(error);
			}
		},

		displayMessagesOfChannel: function(channel_name: string) {
			this.selectedChannelName = channel_name;
			this.$emit('channel-selected', channel_name);
		},
	}
}
</script>
