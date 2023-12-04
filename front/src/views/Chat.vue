<template>
	<div class="chat-view">
		<ChatWindow/>
		<div class="side-panel">
			<UsersList/>
			<FriendsList/>
			<FriendRequests/>
			<BlockedList/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

// Components
import ChatWindow from '../components/chat/ChatWindow.vue';
import UsersList from '../components/chat/UsersList.vue';
import FriendsList from '../components/chat/ListFriends.vue';
import FriendRequests from '../components/chat/ListFriendRequests.vue';
import BlockedList from '../components/chat/ListBlocked.vue';


//import io from 'socket.io-client';


import { useUser } from '../stores/user';
import { useSnackbarStore } from '../stores/snackbar';
import { useSocketStore } from '../stores/websocket';
import { computed } from 'vue';

export default defineComponent({
name: 'ChatView',

components: { ChatWindow, UsersList, FriendsList, FriendRequests, BlockedList },

	setup() {

				const webSocketStore = useSocketStore();
				const userStore = useUser();

				let connectedUsers = [];
			
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
						socket.value.on('chat-error', (data: any) => {
								disconnect();
								snackbarStore.showSnackbar(data, 3000, 'red');
								});
					}

				};

				onMounted(() => {
						connect(JWT.value);
						console.log(isConnected.value);
						console.log('HELLO WORLD !');
						});

				return {
					isConnected,
						socket,
						connect,
						disconnect,
						socketListen,
						JWT,
						connectedUsers,
				};

	},

});
</script>

<style scoped>
.side-panel {
display: flex;
	 flex-direction: column;
}
</style>
