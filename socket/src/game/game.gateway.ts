import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
	ConnectedSocket,
	MessageBody,
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
import { users } from '@prisma/client';

@WebSocketGateway({
	cors: {
		origin: '*',
		credentials: true,
	},
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private logger: Logger = new Logger('GameGateway');

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
	handleSessionJoinTest(@MessageBody() game: GameJoinDto) {
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
	async handleSessionJoin(@ConnectedSocket() client: Socket | any, @MessageBody() game: GameJoinDto) {
		const user: users = client.handshake.user;
		console.log(user.id, ' want to join');
		if (!user) {
			client.emit('error', 'Invalid token');
			client.disconnect();
			return;
		}
		const gameUID: string = game.gameUID;
		const userID: number = user.id;

		this.logger.debug(`Client WebSocket ${user.login} demande à rejoindre la session : ${gameUID}`);
		const waiting: GameJoinDto = this.gameService.isUserWaiting(gameUID, userID);
		if (!waiting) {
			client.emit('game_error', 'Error during session join');
			console.log('Error during session join');
			client.disconnect();
			return;
		}
		console.log('find');
		if (this.gameService.gameExists(gameUID)) {
			const game: IGame = this.gameService.getGame(gameUID);
			console.log('Game already exists');
			if (game.isEnded()) {
				client.emit('game_end', 'Game is ended');
				client.disconnect();
				return;
			}
			if (this.gameService.addUserToGame(game, client, user, waiting.isSpec)) {
				client.join(gameUID);
				this.server.to(gameUID).emit('session-info', game.getAllUsersInGame());
				console.log('user join game');
				if (!game.isInProgress() && game.getUsersInGame().length === 2) game.startGame();
			} else client.disconnect();
		} else {
			console.log('Game not exists');
			const game: IGame = this.gameService.createGame(gameUID);
			if (this.gameService.addUserToGame(game, client, user, waiting.isSpec)) {
				client.join(gameUID);
				this.server.to(gameUID).emit('session-info', game.getAllUsersInGame());
				console.log('user join game');
			} else client.disconnect();
		}
	}

	handleRedisMessage(channel: string, message: any): void {
		const data = JSON.parse(message);
		console.log(data);
		if (data.isEnded) this.gameService.createGame(data.gameUID, data.isEnded);
		this.gameService.addWaitingConnection(data);
		return this.logger.debug(`New redis-message, user ${data.userID} is waiting for game ${data.gameUID}`);
	}

	public afterInit() {
		return this.logger.log('Init');
	}

	public handleDisconnect(client: Socket): void {
		console.log('disconnect');
		this.gameService.removeUserFromGame(client);
		return this.logger.debug(`Client disconnected: ${client.id}`);
	}

	public async handleConnection(client: Socket): Promise<void> {
		try {
			if (!client.handshake.headers.authorization) throw new Error('Invalid token');
			const token = client.handshake.headers.authorization.replace(/Bearer /g, '');
			this.authService.verifyToken({ access_token: token });
			return this.logger.debug(`Client connected: ${client.id}`);
		} catch (e) {
			client.emit('error', 'Invalid token');
			client.disconnect();
		}
	}
}
