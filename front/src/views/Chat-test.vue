<template>
<!--  <button @click="openOverlay"> Open Channel Creation Overlay </button> -->
 <ChannelCreation ref="channelCreationRef" @channel-created="handleChannelCreated" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { useUser } from '../stores/user';
import { useSnackbarStore } from '../stores/snackbar';
import { useSocketStore } from '../stores/websocket';
import { computed } from 'vue';

import { useSocketHandler } from '../plugins/socketHandler';
import { api } from '../plugins/api';

import  ChannelCreation  from '../components/chat/channels/CreateChannel.vue';
//import  ChannelCreation  from '../components/chat/channels/ChannelCreationOverlay.vue';

export default defineComponent({
name: 'ChatTest',
components: {
ChannelCreation,
},

setup() {

	const {
	isConnected,
	socket,
	connect,
	disconnect,
	socketListen,
	JWT,
	connectedUsersIds
	} = useSocketHandler();

	connect(JWT.value);
	
	const apiInstance = new api('POST');
	
	
	const	openOverlay = () => {
//		if (channelCreationRef.value)
			openOverlay.value = true;
	};
	
		onMounted( async () => {
				socketListen();
				});
	
	const handleChannelCreated = async (channelData) => {
		try {
			const response = await apiInstance.createChannel(channelData);
			
			console.log('Triggered channel-created event');
	
			if (response.error)
				console.error('Error creating channel:', reponse.error);
			else
				console.log('Channel created:', await response.json());
		} catch (error) {
			console.error('Error creating channel:', error.message || 'An erroroccurred');
		}
	};
	
	return {
		ChannelCreation,
		handleChannelCreated,
		isConnected,
		socket,
		connect,
		disconnect,
		socketListen,
		JWT,
		connectedUsersIds,
	};
	},

});
</script>
