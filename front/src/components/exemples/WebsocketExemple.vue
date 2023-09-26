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
		const JWT =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoxLCJpYXQiOjE2OTU3MjQ5MjcsImV4cCI6MTY5NTczNTcyN30.F7RrnKLovxoLqchNPlQOb4ARHBxfKGhoA_Ewoc0CRNs';

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
