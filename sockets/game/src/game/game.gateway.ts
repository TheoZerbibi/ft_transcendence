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
import { SIDE } from './engine/enums/Side';
import { PlayerData } from './engine/PlayerData';
import { PrismaService } from 'src/prisma/prisma.service';
import { instrument } from '@socket.io/admin-ui';

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
		private prismaService: PrismaService,
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
			isSpec: false,
			playerData: new PlayerData(670, 150, 10, 100, SIDE.RIGHT),
		};
		if (gameS.isInProgress() && !game.isSpec) {
			gameUser.playerData.side = SIDE.SPECTATOR;
			gameUser.isSpec = true;
		}
		gameS.addUser(gameUser);
		this.server.to(gameUID).emit('session-info', gameS.getAllUsersInGame());
		if (!gameS.isInProgress() && gameS.getUsersInGame().length === 2) this.startGame(gameS);
	}

	@UseGuards(JwtGuard)
	@SubscribeMessage('session-join')
	async handleSessionJoin(@ConnectedSocket() client: Socket | any, @MessageBody() game: GameJoinDto) {
		const user: users = client.handshake.user;
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
			client.emit('game-error', 'Error during session join');
			client.disconnect();
			return;
		}
		if (this.gameService.gameExists(gameUID)) {
			const game: IGame = this.gameService.getGame(gameUID);
			if (game.isEnded()) {
				client.emit('game-end', 'Game is ended');
				client.disconnect();
				return;
			}
			if (game.isInProgress() && !waiting.isSpec) waiting.isSpec = true;
			if (this.gameService.addUserToGame(game, client, user, waiting.isSpec)) {
				client.join(gameUID);
				const allUsers = game.getAllUsersInGame();
				if (!allUsers) {
					client.emit('game-error', 'Error during session join');
					client.disconnect();
					return;
				}
				this.server.to(gameUID).emit('session-info', allUsers);
				if (!game.isInProgress() && game.getUsersInGame().length === 2) this.startGame(game);
				if (!game.getPlayerBySide(SIDE.RIGHT) || !game.getPlayerBySide(SIDE.LEFT)) return;
				if (!game.isInProgress()) return;
				this.server.to(client.id).emit('game-score', {
					p1: game.getPlayerBySide(SIDE.LEFT).playerData.score,
					p2: game.getPlayerBySide(SIDE.RIGHT).playerData.score,
				});
			} else client.disconnect();
		} else {
			client.emit('game-error', 'Game not found.');
			client.disconnect();
			return;
		}
	}

	@UseGuards(JwtGuard)
	@SubscribeMessage('player-move')
	handlePlayerMove(@ConnectedSocket() client: Socket | any, @MessageBody() data: any) {
		const user: users = client.handshake.user;
		if (!user) {
			client.emit('error', 'Invalid token');
			client.disconnect();
			return;
		}
		const gameUID: string = data.gameUID;
		const userID: number = user.id;
		const game: IGame = this.gameService.getGame(gameUID);
		if (!game) {
			client.emit('game-error', 'Game Error, no game found');
			client.disconnect();
			return;
		}
		if (!game.userIsInGame(userID)) {
			client.emit('game-error', 'User is not in the game');
			client.disconnect();
			return;
		}
		const player = game.getUser(userID);
		if (!player) {
			client.emit('game-error', 'User is not in the game');
			client.disconnect();
			return;
		}
		if (player.isSpec) return;
		if (player.playerData.side === SIDE.LEFT) {
			if (game.getPlayerBySide(SIDE.LEFT).user.login != player.user.login) return;
			player.playerData.move(data.direction);
		} else if (player.playerData.side === SIDE.RIGHT) {
			if (game.getPlayerBySide(SIDE.RIGHT).user.login != player.user.login) return;
			player.playerData.move(data.direction);
		}
		this.server.to(game.getGameUID()).emit('player-moved', {
			p1: {
				position: game.getPlayerBySide(SIDE.LEFT).playerData.pos.y,
				width: game.getPlayerBySide(SIDE.LEFT).playerData.w,
				height: game.getPlayerBySide(SIDE.LEFT).playerData.h,
			},
			p2: {
				position: game.getPlayerBySide(SIDE.RIGHT).playerData.pos.y,
				width: game.getPlayerBySide(SIDE.RIGHT).playerData.w,
				height: game.getPlayerBySide(SIDE.RIGHT).playerData.h,
			},
		});
	}

	private startGame(game: IGame): void {
		game.startGame();
		this.server.to(game.getGameUID()).emit('game-start', {
			ball: game.getGameData().ball.getPos(),
			players: game.getUsersInGame(),
			startDate: game.getGameData().startingDate,
		});

		this.server.to(game.getPlayerBySide(SIDE.LEFT).socketID).emit('player-side', {
			side: SIDE.LEFT,
			position: game.getPlayerBySide(SIDE.LEFT).playerData.pos.y,
			width: game.getPlayerBySide(SIDE.LEFT).playerData.w,
			height: game.getPlayerBySide(SIDE.LEFT).playerData.h,
		});
		this.server.to(game.getPlayerBySide(SIDE.RIGHT).socketID).emit('player-side', {
			side: SIDE.RIGHT,
			position: game.getPlayerBySide(SIDE.RIGHT).playerData.pos.y,
			width: game.getPlayerBySide(SIDE.RIGHT).playerData.w,
			height: game.getPlayerBySide(SIDE.RIGHT).playerData.h,
		});

		let countdown = 4;
		const countdownInterval = setInterval(() => {
			if (countdown > 0) {
				this.server.to(game.getGameUID()).emit('countdown', countdown);
				countdown--;
			} else {
				this.server.to(game.getGameUID()).emit('countdown', 0);
				this.gameUpdate(game);
				clearInterval(countdownInterval);
			}
		}, 1000);
	}

	private gameUpdate(game: IGame): void {
		game.startGameLoop();
		const gameLoop = setInterval(async () => {
			if (!game.isEnded()) {
				this.server.to(game.getGameUID()).emit('game-update', {
					position: game.getGameData().ball.getPos().toObject(),
					velocity: game.getGameData().ball.getVel().toObject(),
					speed: game.getGameData().ball.getSpeed(),
					radius: game.getGameData().ball.getRadius(),
				});
				if (game.getGameData().ball.playerLHasHit) {
					const player: IUser = game.getPlayerBySide(SIDE.LEFT);
					await this.gameService.addPoint(game, player);
					this.server
						.to(game.getGameUID())
						.emit('new-point', { side: SIDE.LEFT, score: player.playerData.score });
					game.getGameData().ball.playerLHasHit = false;
					game.setPause(true, 3000);
				}
				if (game.getGameData().ball.playerRHasHit) {
					const player: IUser = game.getPlayerBySide(SIDE.LEFT);
					await this.gameService.addPoint(game, player);
					this.server
						.to(game.getGameUID())
						.emit('new-point', { side: SIDE.RIGHT, score: player.playerData.score });
					game.getGameData().ball.playerRHasHit = false;
					game.setPause(true, 3000);
				}
			} else {
				this.server.to(game.getGameUID()).emit('game-end', {
					startDate: game.getGameData().startingDate,
					endingDate: game.getGameData().endingDate,
				});
				clearInterval(gameLoop);
			}
		}, 1);
	}

	public handleRedisMessage(channel: string, message: any): void {
		const data = JSON.parse(message);
		if (!this.gameService.gameExists(data.gameUID))
			this.gameService.createGame(data.gameID, data.gameUID, data.isEnded);
		this.gameService.addWaitingConnection(data);
		return this.logger.debug(`New redis-message, user ${data.userID} is waiting for game ${data.gameUID}`);
	}

	afterInit() {
		instrument(this.server, {
			auth: false,
			mode: 'development',
			namespaceName: '/game',
		});
	}

	handleDisconnect(client: Socket): void {
		const game = this.gameService.removeUserFromGame(client);
		if (game) this.server.to(game.getGameUID()).emit('session-info', game.getAllUsersInGame());
		return this.logger.debug(`Client disconnected: ${client.id}`);
	}

	async handleConnection(client: Socket): Promise<void> {
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
