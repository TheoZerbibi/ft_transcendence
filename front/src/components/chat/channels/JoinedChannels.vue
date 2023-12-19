<template>
	<!-- Joined Channels list -->
	<div class="ma-2">

		<h3>Joined Channels</h3>
		<v-list v-if="joinedChannels.length">
			<v-list-item 
				v-for="channel in joinedChannels" 
				color="black"
				density="compact"
				:key="channel.id"
				:ripple="false"
				@click="displayMessagesOfChannel(channel.name)">
				<v-list-item-title>
					#{{ channel.name }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
		<v-card-text v-else>~ u didn't join any channels for now ~</v-card-text>
	</div>
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

	props: {
		refresh: Number,
	},
	watch: {
		refresh: function() {
			this.fetchJoinedChannels();
		}
	},

	emits: ['channel-selected', 'ask-refresh'],

	beforeMount() {
		this.fetchJoinedChannels();
	},

	methods: {
		fetchJoinedChannels: async function () {
			try {
				const response: any = await
					fetch(
						`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/list/joined`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${this.JWT}`,
								'Access-Control-Allow-Origin': '*',
							},
						}
					);
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const data = await response.json();

				this.joinedChannels = data;
				if (this.joinedChannels.length > 0) {
					this.selectedChannelName = this.joinedChannels[0].name;
					this.$emit('channel-selected', this.selectedChannelName);
				}

			} catch (error: any) {
				console.error(error);
			}
		},

		displayMessagesOfChannel: function (channel_name: string) {
			this.selectedChannelName = channel_name;
			this.$emit('channel-selected', channel_name);
		},
	}
}
</script>
