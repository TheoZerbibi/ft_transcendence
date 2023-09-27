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
import { IGame } from './impl/interfaces/IGame';

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
		const gameUID: string = game.gameUID;
		const userID: number = game.userID;
		this.logger.log(`Client WebSocket ${client.id} demande à rejoindre la session : ${gameUID}`);
		const wainting: GameJoinDto = this.gameService.isUserWaiting(gameUID, userID);
		if (!wainting) {
			client.emit('game_error', 'Error during session join');
			console.log('Error during session join');
			client.disconnect();
			return;
		}
		if (this.gameService.gameExists(gameUID)) {
			const game: IGame = this.gameService.getGame(gameUID);
			if (this.gameService.addUserToGame(game, client, wainting.isSpec)) {
				client.join(gameUID);
				console.log('session-info', game.getAllUserInGame());
				this.server.to(gameUID).emit('session-info', game.getAllUserInGame());
				if (!game.isInProgress() && game.getUserInGame().length === 2) game.startGame();
				console.log(game);
			} else client.disconnect();
		} else {
			const game: IGame = this.gameService.createGame(gameUID);
			if (this.gameService.addUserToGame(game, client, wainting.isSpec)) {
				client.join(gameUID);
				console.log('session-info', game.getAllUserInGame());
				this.server.to(gameUID).emit('session-info', game.getAllUserInGame());
				if (!game.isInProgress() && game.getUserInGame().length === 2) game.startGame();
				console.log(game);
			} else client.disconnect();
		}
	}

	handleRedisMessage(channel: string, message: any): void {
		const data = JSON.parse(message);
		console.log('userID : ', data.userID);
		this.gameService.addWaitingConnection(data);
		return this.logger.log('redis-message', channel, data);
	}

	public afterInit() {
		return this.logger.log('Init');
	}

	public handleDisconnect(client: Socket): void {
		this.authService.removeUser(client.id);
		return this.logger.log(`Client disconnected: ${client.id}`);
	}

	public async handleConnection(client: Socket): Promise<void> {
		try {
			if (!client.handshake.headers.authorization) throw new Error('Invalid token');
			const token = client.handshake.headers.authorization.replace(/Bearer /g, '');
			this.authService.verifyToken({ access_token: token });
			await this.authService.addUser(client.id, { access_token: token });
			return this.logger.log(`Client connected: ${client.id}`);
		} catch (e) {
			client.emit('error', 'Invalid token');
			client.disconnect();
		}
	}
}
