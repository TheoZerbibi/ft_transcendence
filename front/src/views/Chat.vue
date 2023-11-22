<template>
	<SystemBar></SystemBar>

	<AvatarsBar></AvatarsBar>

	<v-navigation-drawer width="244">
		<v-sheet color="grey-lighten-5" height="128" width="100%"></v-sheet>

		<v-list>
			<v-list-item v-for="channels in channels" :key="channels.updated_at" :title="channels.name" link></v-list-item>
		</v-list>
	</v-navigation-drawer>

	<Toolbar></Toolbar>

	<MessageInput></MessageInput>

	<v-main><!--  --></v-main>

	<OnlineList></OnlineList>
</template>

<script lang="ts">
import AvatarsBar from '../components/chat/AvatarsBar.vue';
import ChatWindow from '../components/chat/ChatWindow.vue';
import MessageInput from '../components/chat/MessageInput.vue';
import OnlineList from '../components/chat/OnlineList.vue';
import SystemBar from '../components/chat/SystemBar.vue';
import Toolbar from '../components/chat/Toolbar.vue';
import ChatWindowVue from '../components/chat/ChatWindow.vue';
import Snackbar from '../components/layout/Snackbar.vue';
import { useSnackbarStore } from '../stores/snackbar';
import { useUser } from '../stores/user';
import { useSocketStore } from '../stores/websocket';
import { computed } from 'vue';

const snackbarStore = useSnackbarStore();

export default {
name: "Chat",
components: {
	AvatarsBar,
	ChatWindow,
	MessageInput,
	OnlineList,
	SystemBar,
	Toolbar,
	ChatWindowVue,
	Snackbar,
},
setup() {
	
	const webSocketStore = useSocketStore();
	const userStore = useUser();

	const isConnected = computed(() => webSocketStore.isConnected);
	const socket = computed(() => webSocketStore.getSocket);
	const JWT = computed(() => userStore.getJWT);

	const connect = async (JWT: string) => {
		await webSocketStore.connect(JWT, import.meta.env.VITE_CHAT_SOCKET_PORT);
	};

	const disconnect = () => {
		webSocketStore.disconnect();
	};

	const socketListen = () => {
		if (socket.value) {
			socket.value.on('game-error', (data: any) => {
				disconnect();
				snackbarStore.showSnackbar(data, 3000, 'red');
			});
		}
	};
	return {
		isConnected,
		socket,
		connect,
		disconnect,
		socketListen,
		JWT,
	};
},
data() {
	return {
		channels: [], // to store the channels
	};
},
beforeMount() {
	this.fetchChannels();
},
mounted() {},
methods: {
	fetchChannels: async function() {
	try {
		const response = await fetch(
			`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/joined`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.JWT}`,
					'Access-Control-Allow-Origin': '*',
				},
			}
		);
		if (response.ok) {
			const data = await response.json();
			this.channels = data; // store the response in channels
			console.log(this.channels);
		} else {
			console.error('Failed to fetch channels');
		}
	} catch (error) {
		console.error(error);
	}
},	
}
}
</script>
