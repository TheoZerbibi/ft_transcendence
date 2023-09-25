<script lang="ts">
import { computed, defineComponent } from 'vue';

import { useSocketStore } from '../../stores/websocket';

export default defineComponent({
	setup() {
		const webSocketStore = useSocketStore();

		const isConnected = computed(() => webSocketStore.isConnected);
		const socket = computed(() => webSocketStore.getSocket);
		const JWT =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoxLCJpYXQiOjE2OTU2MzEyMDgsImV4cCI6MTY5NTY0MjAwOH0.6109jAWMRor5ffccaVL34Eov5ZRrhlhSOemHHdSZHXE';

		const connect = async () => {
			await webSocketStore.connect(JWT);
		};

		const disconnect = () => {
			webSocketStore.disconnect();
		};

		return {
			isConnected,
			socket,
			connect,
			disconnect,
		};
	},
});
</script>
<template>
	<v-card class="d-flex flex-column align-center justify-center" min-height="100%" color="transparent">
		<v-card class="d-flex justify-center mb-3" color="transparent">
			<v-btn color="blue" dark @click="connect">Connect</v-btn>
			<v-btn color="red" class="ms-1" dark @click="disconnect">Disconnect</v-btn>
		</v-card>
		<v-card :style="{ backgroundColor: `${isConnected ? '#00E676' : '#D50000'}` }" class="white--text">
			<v-card-title primary-title>
				<div>
					<span>{{ isConnected }}</span>
				</div>
			</v-card-title>
		</v-card>
	</v-card>
</template>
