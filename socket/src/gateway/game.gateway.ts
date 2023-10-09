import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private logger: Logger = new Logger('TestGateway');

	constructor(private authService: AuthService) {}
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
		try {
			if (!client.handshake.headers.authorization) throw new Error('Invalid token');
			const token = client.handshake.headers.authorization.replace(/Bearer /g, '');
			this.authService.verifyToken({ access_token: token });
			client.emit('test', 'Connection established');
			return this.logger.log(`Client connected: ${client.id}`);
		} catch (e) {
			client.emit('error', 'Invalid token');
			client.disconnect();
		}
	}
}
