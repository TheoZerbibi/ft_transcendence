<script lang="ts">
import { computed, defineComponent } from 'vue';

import { useSocketStore } from '../../stores/websocket';

export default defineComponent({
	beforeRouteLeave(to: any, from: any, next: any) {
		if (this.isConnected) this.disconnect();
		next();
	},
	setup() {
		const webSocketStore = useSocketStore();

		const isConnected = computed(() => webSocketStore.isConnected);
		const socket = computed(() => webSocketStore.getSocket);

		const connect = async () => {
<<<<<<< HEAD
			await webSocketStore.connect(JWT, import.meta.env.VITE_GAME_SOCKET_PORT);
=======
			await webSocketStore.connect(JWT);
>>>>>>> c80165e (fix: github issue)
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
