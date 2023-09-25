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
import { GameJoinDto } from './dto/game-join.dto';
import { GameService } from './game.service';

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private logger: Logger = new Logger('TestGateway');

	constructor(
		private authService: AuthService,
		private gameService: GameService,
	) {}
	@WebSocketServer() server: Server;

	@SubscribeMessage('new-connection')
	newConnection(client: any, data: any): void {
		this.handleRedisMessage(client, data);
	}

	@SubscribeMessage('session-join')
	handleSessionJoin(client: Socket, game: GameJoinDto) {
		const gameUID = game.uid;
		// const gameInstance = this.gameService.getGameInfo(gameUID);
		console.log(gameUID);
		console.log(`Client WebSocket ${client.id} demande à rejoindre la session : ${gameUID}`);
		client.join(gameUID);
		this.server.to(gameUID).emit('session-joined', `Client ${client.id} a rejoint la session ${gameUID}`);
		this.server.to(gameUID).emit('session-info', `Client ${client.id} a rejoint la session ${gameUID}`);
		console.log(this.server.sockets.adapter.rooms.get(gameUID).entries());
	}

	handleRedisMessage(channel: string, message: any): void {
		console.log('redis-message', channel, JSON.parse(message));
		if (!this.gameService.gameExist(message.uid)) {
			this.gameService.createGame(message.uid);
			// this.gameService.joinGame(message.uid, message.userID);
		}
	}

	public afterInit() {
		return this.logger.log('Init');
	}

	public handleDisconnect(client: Socket): void {
		this.gameService.removePlayer(client);
		return this.logger.log(`Client disconnected: ${client.id}`);
	}

	public handleConnection(client: Socket): void {
		try {
			if (!client.handshake.headers.authorization) throw new Error('Invalid token');
			const token = client.handshake.headers.authorization.replace(/Bearer /g, '');
			this.authService.verifyToken({ access_token: token });
			return this.logger.log(`Client connected: ${client.id}`);
		} catch (e) {
			client.emit('error', 'Invalid token');
			client.disconnect();
		}
	}
}
