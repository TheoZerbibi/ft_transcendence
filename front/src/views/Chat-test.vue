<template>
  <ChannelCreation @channel-created="handleChannelCreated" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { useUser } from '../stores/user';
import { useSnackbarStore } from '../stores/snackbar';
import { useSocketStore } from '../stores/websocket';
import { computed } from 'vue';

import { useSocketHandler } from '../plugins/socketHandler';
import { ChannelCreation } from '../components/chat/ChannelCreationOverlay.vue';
import { createChannel } from '../plugins/api';

export default defineComponent({
name: 'ChatView',
components: {
		ChannelCreation,
	},

	setup(props) {

				const tab = ref(0); // Start with the first tab active

				const {
				isConnected,
				socket,
				connect,
				disconnect,
				socketListen,
				JWT,
				connectedUsersIds,
				} = useSocketHandler();


				onMounted( async () => {
						socketListen();
						});

				const handleChannelCreated = async (channelData) => {
					try {
						const response = await createChannel(channelData);

						if (response.error)
							console.error('Error creating channel:', reponse.error);
						else
							console.log('Channel created:', response.data);
					} catch (error) {
						console.error('Error creating channel:', error.message || 'An erroroccurred');
					}
				};

				return {
					handleChannelCreated,
						isConnected,
						socket,
						connect,
						disconnect,
						socketListen,
						JWT,
						connectedUsersIds,
						tab,
				};

	},

	data() {
	},

	beforeMount() {
	},

	mounted() {
	},

methods: {
	 }

});
</script>
