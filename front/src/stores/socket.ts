import { defineStore } from 'pinia';

import { io, Socket } from 'socket.io-client';

const serverURL = `http://${HOST}:4000`;

export const useSocketStore = defineStore('webSocket', {
	state: () => ({
		socket: null as Socket | null,
	}),

	getters: {
		isConnected: (state) => state.socket !== null,
	},

	actions: {
		connect(JWT: string) {
			if (!this.isConnected) {
				console.log('Connecting to socket');
				this.socket = io(serverURL, {
					extraHeaders: {
						Authorization: `Bearer ${JWT}`,
					},
				});
			}
		},
		disconnect() {
			if (this.isConnected) {
				console.log('Disconnecting from socket');
				this.socket?.disconnect();
				this.socket = null;
			}
		},
		getSocket() {
			return this.socket;
		},
	},
});
