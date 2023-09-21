import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private logger: Logger = new Logger('TestGateway');

	constructor(private jwt: JwtService) {}
	@WebSocketServer() server: Server;

	@SubscribeMessage('new-connection')
	newConnection(client: any, data: any): void {
		this.handleRedisMessage(client, data);
	}

	@SubscribeMessage('session-join')
	handleSessionJoin(client: Socket, sessionId: string) {
		console.log(`Client WebSocket ${client.id} demande à rejoindre la session : ${sessionId}`);
		client.join(sessionId);
		this.server.to(sessionId).emit('session-joined', `Client ${client.id} a rejoint la session ${sessionId}`);
	}

	handleRedisMessage(channel: string, message: string): void {
		console.log('redis-message', { channel, message });
	}

	public afterInit() {
		return this.logger.log('Init');
	}

	public handleDisconnect(client: Socket): void {
		return this.logger.log(`Client disconnected: ${client.id}`);
	}

	public handleConnection(client: Socket): void {
		console.log(client.handshake.headers.authorization);

		try {
			this.jwt.verify(client.handshake.headers.authorization);
			return this.logger.log(`Client connected: ${client.id}`);
		} catch (e) {
			client.emit('error', 'Invalid token');
			client.disconnect();
		}
	}
}
