import { defineStore } from 'pinia';

import { io, Socket } from 'socket.io-client';

export const useSocketStore = defineStore('webSocket', {
	state: () => ({
		socket: null as Socket | null,
	}),
	getters: {
		isConnected: (state) => {
			if (!state.socket) return false;
			return state.socket.connected;
		},
		getSocket: (state) => state.socket,
	},
	actions: {
		async connect(jwt: string, port: any): Promise<Socket> {
			const serverURL = `http://${import.meta.env.VITE_HOST}:4000`;
			if (!this.isConnected) {
				console.log('Connecting to socket ', serverURL);
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
