import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GameJoinDto } from './dto/game-join.dto';
import { GameService } from './game.service';
import { IGame } from './impl/interfaces/IGame';
import { IUser } from './impl/interfaces/IUser';
import { uniqueNamesGenerator, names } from 'unique-names-generator';
import { JwtGuard } from 'src/auth/guard';

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

	@SubscribeMessage('session-join-test')
	handleSessionJoinTest(client: Socket, game: GameJoinDto) {
		const gameUID: string = game.gameUID;
		const randomName = uniqueNamesGenerator({
			dictionaries: [names],
			length: 1,
		});
		let id = 1;

		const gameS: IGame = this.gameService.getGame(gameUID);
		for (; gameS.userIsInGame(id); id++);

		const gameUser: IUser = {
			user: {
				id: id,
				login: randomName,
				displayName: randomName.charAt(0).toUpperCase() + randomName.slice(1),
				avatar: 'null',
			},
			socketID: 'null',
			isSpec: true,
		};
		gameS.addUser(gameUser);
		this.server.to(gameUID).emit('session-info', gameS.getAllUsersInGame());
	}

	@UseGuards(JwtGuard)
	@SubscribeMessage('session-join')
	handleSessionJoin(client: Socket, game: GameJoinDto) {
		const gameUID: string = game.gameUID;
		const userID: number = game.userID;
		this.logger.debug(`Client WebSocket ${client.id} demande à rejoindre la session : ${gameUID}`);
		const waiting: GameJoinDto = this.gameService.isUserWaiting(gameUID, userID);
		if (!waiting) {
			client.emit('game_error', 'Error during session join');
			client.disconnect();
			return;
		}
		if (this.gameService.gameExists(gameUID)) {
			const game: IGame = this.gameService.getGame(gameUID);
			if (game.isEnded()) {
				client.emit('game_end', 'Game is ended');
				client.disconnect();
				return;
			}
			if (this.gameService.addUserToGame(game, client, waiting.isSpec)) {
				client.join(gameUID);
				this.server.to(gameUID).emit('session-info', game.getAllUsersInGame());
				if (!game.isInProgress() && game.getUsersInGame().length === 2) game.startGame();
			} else client.disconnect();
		} else {
			const game: IGame = this.gameService.createGame(gameUID);
			if (this.gameService.addUserToGame(game, client, waiting.isSpec)) {
				client.join(gameUID);
				this.server.to(gameUID).emit('session-info', game.getAllUsersInGame());
			} else client.disconnect();
		}
	}

	handleRedisMessage(channel: string, message: any): void {
		const data = JSON.parse(message);
		this.gameService.addWaitingConnection(data);
		return this.logger.debug(`New redis-message, user ${data.userID} is waiting for game ${data.gameUID}`);
	}

	public afterInit() {
		return this.logger.log('Init');
	}

	public handleDisconnect(client: Socket): void {
		this.gameService.removeUserFromGame(client);
		this.authService.removeUser(client.id);
		return this.logger.debug(`Client disconnected: ${client.id}`);
	}

	public async handleConnection(client: Socket): Promise<void> {
		try {
			if (!client.handshake.headers.authorization) throw new Error('Invalid token');
			const token = client.handshake.headers.authorization.replace(/Bearer /g, '');
			this.authService.verifyToken({ access_token: token });
			await this.authService.addUser(client.id, { access_token: token });
			return this.logger.debug(`Client connected: ${client.id}`);
		} catch (e) {
			client.emit('error', 'Invalid token');
			client.disconnect();
		}
	}
}
