import { defineStore } from 'pinia';

import { io, Socket } from 'socket.io-client';

<<<<<<< HEAD
=======
// eslint-disable-next-line no-undef
const serverURL = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_GAME_SOCKET_PORT}`;

>>>>>>> c80165e (fix: github issue)
export const useSocketStore = defineStore('webSocket', {
	state: () => ({
		socket: null as Socket | null,
	}),
	getters: {
		isConnected: (state) => {
			if (!state.socket) return false;
<<<<<<< HEAD
=======
			console.log(state.socket.connected);
>>>>>>> c80165e (fix: github issue)
			return state.socket.connected;
		},
		getSocket: (state) => state.socket,
	},
	actions: {
<<<<<<< HEAD
<<<<<<< HEAD
		async connect(jwt: string, port: number): Promise<Socket> {
			const serverURL = `http://${import.meta.env.VITE_HOST}:${port}`;
=======
		async connect(jwt: string, port: any): Promise<Socket> {
<<<<<<< HEAD
			const serverURL = `http://${import.meta.env.VITE_HOST}:4000`;
>>>>>>> ef81387 (feat(pong): Start Responsive)
=======
			const serverURL = `http://${import.meta.env.VITE_HOST}:${port}`;
>>>>>>> 98da990 (feat(pong): Improve Pong, fix a lot a Backend error + more frontend.)
			if (!this.isConnected) {
=======
		async connect(jwt: string): Promise<Socket> {
			if (!this.isConnected) {
				console.log('Connecting to socket');
>>>>>>> c80165e (fix: github issue)
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
<<<<<<< HEAD
=======
				console.log('Disconnecting from socket');
>>>>>>> c80165e (fix: github issue)
				this.socket?.disconnect();
				this.socket = null;
			}
		},
	},
});
