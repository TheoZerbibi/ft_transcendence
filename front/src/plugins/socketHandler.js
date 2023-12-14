// useSocketHandler.js
import { ref, computed, onMounted } from 'vue';
import { useUser } from '../stores/user';
import { useSnackbarStore } from '../stores/snackbar';
import { useSocketStore } from '../stores/websocket';

export function useSocketHandler() {
	const webSocketStore = useSocketStore();
	const userStore = useUser();
	const connectedUsersIds = ref([]);

	const isConnected = computed(() => webSocketStore.isConnected);
	const socket = computed(() => webSocketStore.getSocket);
	const JWT = computed(() => userStore.getJWT);

	const connect = async (JWT) => {
		await webSocketStore.connect(JWT, import.meta.env.VITE_CHAT_SOCKET_PORT);
	};

	const disconnect = () => {
		webSocketStore.disconnect();
	};

	const socketListen = () => {
		if (socket.value) {
			socket.value.on('chat-error', (data) => {
				disconnect();
				snackbarStore.showSnackbar(data, 3000, 'red');
			});

			socket.value.on('user-connected', (userId) => {
				connectedUserIds.value.push(userId);
			});

			socket.value.on('user-disconnected', (userId) => {
				const index = connectedUserIds.value.indexOf(userId);
				if (index !== -1) {
					connectedUserIds.value.splice(index, 1);
				}});

			socket.value.on('welcome', (data) => {
				console.log(`retrieved ${data.json()}`); connectedUsers = JSON.parse(data)
			});
			//	socket.value.on('new-direct-message', (data: any) => { connectedUsers = JSON.parse(data) });
			//	socket.value.on('channel-updated', (data: any) => { connectedUsers = JSON.parse(data) });
			//	socket.value.on('channel-user-update', (data: any) => { connectedUsers = JSON.parse(data) });
			//	socket.value.on('channel-creation', (data: any) => { connectedUsers = JSON.parse(data) });
			//	socket.value.on('channel-joined', (data: any) => { connectedUsers = JSON.parse(data) });
			//	socket.value.on('user-quitted-channel', (data: any) => { connectedUsers = JSON.parse(data) });
			//	socket.value.on('channel-deleted', (data: any) => { connectedUsers = JSON.parse(data) });
			//	});

			// Add other socket listeners as needed
		}
		};

		onMounted(() => {
			connect(JWT.value);
		});

		return {
			isConnected,
			socket,
			connect,
			disconnect,
			socketListen,
			JWT,
			connectedUsersIds,
		};
	}

