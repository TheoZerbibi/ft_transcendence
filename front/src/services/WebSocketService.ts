import { io, Socket } from 'socket.io-client';

const serverURL = `http://${HOST}:4000`;

class WebSocketService {
	private socket: Socket;

	getSocket(): Socket {
		return this.socket;
	}

	connect(JWT: string): Socket {
		console.log('Connecting to socket');
		this.socket = io(serverURL, {
			extraHeaders: {
				Authorization: `Bearer ${JWT}`,
			},
		});
		return this.socket;
	}
}

export const webSocketService = new WebSocketService();
