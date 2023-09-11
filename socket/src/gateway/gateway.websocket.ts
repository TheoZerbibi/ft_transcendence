import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({})
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	// eslint-disable-next-line
	server: Server;

	private logger: Logger = new Logger('MessageGateway');

	@SubscribeMessage('message')
	public onNewMessage(@MessageBody() data: any) {
		console.log(data);
		this.server.emit('onMessage', {
			msg: 'new Message',
			content: data,
		});
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
