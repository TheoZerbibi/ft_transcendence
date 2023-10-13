import { defineStore } from 'pinia';

import { io, Socket } from 'socket.io-client';

// eslint-disable-next-line no-undef
const serverURL = `http://${VITE_HOST}:${VITE_GAME_SOCKET_PORT}`;

export const useSocketStore = defineStore('webSocket', {
	state: () => ({
		socket: null as Socket | null,
	}),
	getters: {
		isConnected: (state) => {
			if (!state.socket) return false;
			console.log(state.socket.connected);
			return state.socket.connected;
		},
		getSocket: (state) => state.socket,
	},
	actions: {
		async connect(jwt: string): Promise<Socket> {
			if (!this.isConnected) {
				console.log('Connecting to socket');
				this.socket = await new Promise((resolve, reject) => {
					const socket = io(serverURL, {
						extraHeaders: {
							Authorization: `Bearer ${jwt}`,
						},
					});
					socket.on('connect', () => {
						resolve(socket);
					});
					socket.on('error', (error) => {
						reject(error);
					});
				});
			}
			return this.socket as Socket;
		},
		disconnect() {
			if (this.isConnected) {
				console.log('Disconnecting from socket');
				this.socket?.disconnect();
				this.socket = null;
			}
		},
	},
});
