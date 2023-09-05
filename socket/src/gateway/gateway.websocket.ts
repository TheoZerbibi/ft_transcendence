import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({})
export class Gateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer()
	server: Server;

	private logger: Logger = new Logger('MessageGateway');

	@SubscribeMessage('message')
	public onNewMessage(@MessageBody() data: any) {
		console.log(data);
		this.server.emit('onMessage', {
			msg: 'new Message',
			content: data
		});
	}

	public afterInit(server: Server): void {
		return this.logger.log('Init');
	}
	
	public handleDisconnect(client: Socket): void {
		return this.logger.log(`Client disconnected: ${client.id}`);
	}
	
	public handleConnection(client: Socket): void {
		return this.logger.log(`Client connected: ${client.id}`);
	}
}
