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
	) {}
	@WebSocketServer() server: Server;

	@UseGuards(JwtGuard)
	@SubscribeMessage('session-join')
	async handleSessionJoin(@ConnectedSocket() client: Socket | any, @MessageBody() game: GameJoinDto) {
		const user: users = this.authService.getUserFromRequest(client);
		const gameUID: string = game.gameUID;
		if (!user || !gameUID) return;

		const waiting: GameJoinDto = this.gameService.isUserWaiting(client, gameUID, user.id);
		if (!waiting) return;
		if (this.gameService.gameExists(gameUID)) {
			const game: IGame = this.gameService.getGame(gameUID);
			if (game.isEnded()) {
				client.emit('game-end', 'Game is ended');
				client.disconnect();
				return;
			}
			if (game.isInProgress() && !waiting.isSpec) waiting.isSpec = true;
			const gameUser: IUser = this.gameService.addUserToGame(game, client, user, waiting.isSpec);
			if (gameUser) {
				client.join(gameUID);
				const allUsers = game.getAllUsersInGame();
				if (!allUsers) {
					client.emit('game-error', 'Error during session join');
					client.disconnect();
					return;
				}
				this.server.to(gameUID).emit('session-info', allUsers);
				if (!game.getPlayerBySide(SIDE.RIGHT) || !game.getPlayerBySide(SIDE.LEFT)) return;
				if (!game.isInProgress() && game.getUsersInGame().length === 2) {
					game.setWaitingState(true);
					this.server.emit('waiting-start', {
						leftUser: game.getPlayerBySide(SIDE.LEFT).user,
						rightUser: game.getPlayerBySide(SIDE.RIGHT).user,
					});
				}
				if (!game.isInProgress()) return;
				if (gameUser.isSpec) {
					this.server.to(client.id).emit('player-moved', {
						leftUser: {
							position: game.getPlayerBySide(SIDE.LEFT).playerData.pos.toObject(),
							width: game.getPlayerBySide(SIDE.LEFT).playerData.w,
							height: game.getPlayerBySide(SIDE.LEFT).playerData.h,
						},
						rightUser: {
							position: game.getPlayerBySide(SIDE.RIGHT).playerData.pos.toObject(),
							width: game.getPlayerBySide(SIDE.RIGHT).playerData.w,
							height: game.getPlayerBySide(SIDE.RIGHT).playerData.h,
						},
					});
					this.server.to(client.id).emit('game-already-start', {
						startDate: game.getGameData().startingDate,
						leftUser: game.getPlayerBySide(SIDE.LEFT).user,
						rightUser: game.getPlayerBySide(SIDE.RIGHT).user,
					});
				}
				this.server.to(client.id).emit('game-score', {
					leftUser: game.getPlayerBySide(SIDE.LEFT).playerData.score,
					rightUser: game.getPlayerBySide(SIDE.RIGHT).playerData.score,
				});
			} else {
				client.disconnect();
			}
		} else {
			client.emit('game-error', 'Game not found.');
			client.disconnect();
			return;
		}
	}

	@UseGuards(JwtGuard)
	@SubscribeMessage('player-move')
	handlePlayerMove(@ConnectedSocket() client: Socket | any, @MessageBody() data: any) {
		const user: users = this.authService.getUserFromRequest(client);
		const gameUID: string = data.gameUID;
		if (!user || !gameUID) return;

		const game: IGame = this.gameService.getGame(gameUID);
		const player = this.gameService.gameVerification(client, gameUID, user.id);
		if (!player) return;
		if (player.isSpec) return;
		if (player.playerData.side === SIDE.LEFT) {
			if (game.getPlayerBySide(SIDE.LEFT).user.login != player.user.login) return;
			player.playerData.move(data.direction);
		} else if (player.playerData.side === SIDE.RIGHT) {
			if (game.getPlayerBySide(SIDE.RIGHT).user.login != player.user.login) return;
			player.playerData.move(data.direction);
		}
		this.sendPosition(game);
	}

	@UseGuards(JwtGuard)
	@SubscribeMessage('player-ready')
	playerIsReady(@ConnectedSocket() client: Socket | any, @MessageBody() data: any) {
		const user: users = this.authService.getUserFromRequest(client);
		const gameUID: string = data.gameUID;
		if (!user || !gameUID) return;

		const game: IGame = this.gameService.getGame(gameUID);
		const player = this.gameService.gameVerification(client, gameUID, user.id);
		if (!player) return;
		if (player.isSpec || player.isReady) return;
		player.isReady = true;
		const opponent: IUser = game.getPlayerBySide(player.playerData.side === SIDE.LEFT ? SIDE.RIGHT : SIDE.LEFT);
		if (!opponent) return;
		if (opponent.isReady) this.startGame(game);
	}

	public afterInit() {
		instrument(this.server, {
			auth: false,
			mode: 'development',
			namespaceName: '/game',
		});
	}

	handleDisconnect(client: Socket): void {
		const game: IGame = this.gameService.removeUserFromGame(client);
		if (game) {
			this.server.to(game.getGameUID()).emit('session-info', game.getAllUsersInGame());
			if (game.getWaitingState()) {
				game.setWaitingState(false);
				this.server.to(game.getGameUID()).emit('cancel-waiting');
				game.removeGame();
			}
		}
	}

	async handleConnection(client: Socket): Promise<void> {
		try {
			if (!client.handshake.headers.authorization) throw new Error('Invalid token');
			const token = client.handshake.headers.authorization.replace(/Bearer /g, '');
			this.authService.verifyToken({ access_token: token });
		} catch (e) {
			this.logger.error(e);
			client.disconnect();
			return e;
		}
	}

	private startGame(game: IGame): void {
		let countdown = 4;
		game.startGame();
		this.server.to(game.getGameUID()).emit('game-start', {
			players: game.getUsersInGame(),
			startDate: game.getGameData().startingDate,
			leftUser: game.getPlayerBySide(SIDE.LEFT).user,
			rightUser: game.getPlayerBySide(SIDE.RIGHT).user,
		});
		this.sendSide(game);
		this.sendPosition(game);
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

	private sendPosition(game: IGame) {
		this.server.to(game.getGameUID()).emit('player-moved', {
			leftUser: {
				position: game.getPlayerBySide(SIDE.LEFT).playerData.pos.toObject(),
				width: game.getPlayerBySide(SIDE.LEFT).playerData.w,
				height: game.getPlayerBySide(SIDE.LEFT).playerData.h,
			},
			rightUser: {
				position: game.getPlayerBySide(SIDE.RIGHT).playerData.pos.toObject(),
				width: game.getPlayerBySide(SIDE.RIGHT).playerData.w,
				height: game.getPlayerBySide(SIDE.RIGHT).playerData.h,
			},
		});
	}

	private sendSide(game: IGame) {
		this.server.to(game.getPlayerBySide(SIDE.LEFT).socketID).emit('player-side', {
			side: SIDE.LEFT,
			position: game.getPlayerBySide(SIDE.LEFT).playerData.pos.toObject(),
			width: game.getPlayerBySide(SIDE.LEFT).playerData.w,
			height: game.getPlayerBySide(SIDE.LEFT).playerData.h,
		});
		this.server.to(game.getPlayerBySide(SIDE.RIGHT).socketID).emit('player-side', {
			side: SIDE.RIGHT,
			position: game.getPlayerBySide(SIDE.RIGHT).playerData.pos.toObject(),
			width: game.getPlayerBySide(SIDE.RIGHT).playerData.w,
			height: game.getPlayerBySide(SIDE.RIGHT).playerData.h,
		});
	}

	private sendBallPosition(game: IGame) {
		this.server.to(game.getGameUID()).emit('game-update', {
			position: game.getGameData().ball.getPos().toObject(),
			velocity: game.getGameData().ball.getVel().toObject(),
			speed: game.getGameData().ball.getSpeed(),
			radius: game.getGameData().ball.getRadius(),
		});
	}

	public async sendWinner(game: IGame) {
		const winner: IUser = game.winner;
		const loser: IUser = game.loser;
		if (winner.isConnected) this.server.to(winner.socketID).emit('game-win');
		if (loser.isConnected) this.server.to(loser.socketID).emit('game-lose');
		this.server.to(game.getGameUID()).emit('game-end', {
			winner: { user: winner.user, score: winner.playerData.score, side: winner.playerData.side },
			loser: { user: loser.user, score: loser.playerData.score, side: loser.playerData.side },
			startDate: game.getGameData().startingDate,
			endingDate: game.getGameData().endingDate,
		});
	}

	private gameUpdate(game: IGame): void {
		game.startGameLoop();
		const gameLoop = setInterval(async () => {
			if (!game.isEnded()) {
				if (!game.isInPause()) this.sendBallPosition(game);
				if (game.newPoint) {
					const leftUser: IUser = game.getPlayerBySide(SIDE.LEFT);
					const rightUser: IUser = game.getPlayerBySide(SIDE.RIGHT);
					if (!leftUser || !leftUser.isConnected || !rightUser || !rightUser.isConnected) return;
					this.server.to(game.getGameUID()).emit('game-score', {
						leftUser: leftUser.playerData.score,
						rightUser: rightUser.playerData.score,
					});
					game.newPoint = false;
				}
			} else {
				this.sendWinner(game);
				clearInterval(gameLoop);
			}
		}, 1);
	}
}
