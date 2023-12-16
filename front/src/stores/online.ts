import { defineStore } from 'pinia';

import { io, Socket } from 'socket.io-client';

export const useOnlineSocketStore = defineStore('online', {
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
		async connect(jwt: string): Promise<Socket> {
			const serverURL = `http://${import.meta.env.VITE_HOST}:4000/online`;
			console.log(serverURL);
			if (!this.isConnected) {
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
				this.socket?.disconnect();
				this.socket = null;
			}
		},
	},
});
