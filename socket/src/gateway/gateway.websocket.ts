import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

type Payload = {
	name: string;
	text: string;
};

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	private logger: Logger = new Logger('MessageGateway');

	@SubscribeMessage('message')
	handleMessage(client: Socket, payload: any) {
		console.log('Received WebSocket message:', payload);
		this.server.emit('response', 'Hello from WebSocket Gateway!');
	}

	@SubscribeMessage('connectClientToSocket')
	public onNewConnection(client: Socket, payload: Payload) {
		console.log('Yep');
		console.log(payload);
	}

	public afterInit(): void {
		return this.logger.log('Init');
	}

	public handleDisconnect(client: Socket): void {
		return this.logger.log(`Client disconnected: ${client.id}`);
	}

	public handleConnection(client: Socket): void {
		return this.logger.log(`Client connected: ${client.id}`);
	}
}
