<script setup lang="ts">
import { useSocketStore } from '../../stores/socket';

const webSocketStore = useSocketStore();

const connect = () => {
	const JWT =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoxLCJpYXQiOjE2OTU1MDg4NjAsImV4cCI6MTY5NTUxOTY2MH0.iWWu6mPGCvzuxHcEbsXJRHrQ2cZEzYchbzvxSkg2Y58';
	webSocketStore.connect(JWT);
};

const disconnect = () => {
	webSocketStore.disconnect();
};
</script>
<template>
	<v-card
		class="d-flex flex-column align-center justify-center"
		min-height="100%"
		:style="{ backgroundColor: '#2e2e2e' }"
	>
		<div class="d-flex justify-center">
			<v-btn color="blue" dark @click="connect">Connect</v-btn>
			<v-btn color="red" dark @click="disconnect">Disconnect</v-btn>
		</div>
		<v-card class="mt-4" :style="{ backgroundColor: `${webSocketStore.isConnected ? 'green' : 'red' }` }"> {{ webSocketStore.isConnected }} </v-card>
	</v-card>
  </template>
