import { Injectable } from '@nestjs/common';
import { GameJoinDto } from './dto/game-join.dto';
import { Game } from './impl/Game';
import { IGame } from './impl/interfaces/IGame';
import { users } from '@prisma/client';
import { IUser } from './impl/interfaces/IUser';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
<<<<<<< HEAD
import { PlayerData } from './engine/PlayerData';
import { SIDE } from './engine/enums/Side';
import { IPlayerData } from './impl/interfaces/IPlayerData';
=======
>>>>>>> c80165e (fix: github issue)

@Injectable()
export class GameService {
	private waitingConnections: Map<number, GameJoinDto> = new Map<number, GameJoinDto>();

	constructor(private prismaService: PrismaService) {}

<<<<<<< HEAD
	public handleRedisMessage(channel: string, message: any): void {
		const data = JSON.parse(message);
		if (!this.gameExists(data.gameUID)) this.createGame(data.gameID, data.gameUID, data.isEnded);
		this.addWaitingConnection(data);
	}

=======
>>>>>>> c80165e (fix: github issue)
	public addWaitingConnection(joinUser: GameJoinDto) {
		this.waitingConnections.set(joinUser.userID, joinUser);
	}

<<<<<<< HEAD
	public isUserWaiting(client: Socket, gameUID: string, userID: number): GameJoinDto | null {
		if (!this.waitingConnections.has(userID)) return null;
		const wainting = this.waitingConnections.get(userID);
		if (wainting.gameUID !== gameUID) {
			client.emit('game-error', 'Error during session join');
			client.disconnect();
			return null;
		}
=======
	public isUserWaiting(gameUID: string, userID: number): GameJoinDto | null {
		console.log(`isUserWaiting :`, this.waitingConnections);
		if (!this.waitingConnections.has(userID)) return null;
		const wainting = this.waitingConnections.get(userID);
		if (wainting.gameUID !== gameUID) return null;
>>>>>>> c80165e (fix: github issue)
		return wainting;
	}

	public gameExists(gameUID: string): boolean {
		return Game.getGamesFromUID(gameUID) !== undefined;
	}

	public getGame(gameUID: string): IGame {
		return Game.getGamesFromUID(gameUID);
	}

<<<<<<< HEAD
	public createGame(gameID: number, gameUID: string, isEnded: boolean = false): IGame {
		const game = new Game(this.prismaService, gameID, gameUID, isEnded);
=======
	public createGame(gameUID: string, isEnded: boolean = false): IGame {
		console.log('new game : ', gameUID, ' isEnded :', isEnded);
		const game = new Game(this.prismaService, gameUID, isEnded);
		console.log('new game created');
>>>>>>> c80165e (fix: github issue)
		return game;
	}

	public addUserToGame(game: IGame, client: Socket, user: users, isSpec: boolean): boolean {
		if (game.userIsInGame(user.id)) {
<<<<<<< HEAD
			client.emit('game-error', 'Already in Game session');
			return true;
		}

		let side: SIDE;
		if (game.getUsersInGame().length === 0) side = SIDE.LEFT;
		else if (game.getUsersInGame().length === 1) side = SIDE.RIGHT;
		else side = SIDE.SPECTATOR;

		if (isSpec) side = SIDE.SPECTATOR;

		let playerData: IPlayerData = null;
		if (side === SIDE.LEFT)
			playerData = new PlayerData(
				game.getWidth(),
				game.getHeight(),
				20,
				game.getHeight() / 2 - 50,
				10,
				100,
				SIDE.LEFT,
			);
		else if (side === SIDE.RIGHT)
			playerData = new PlayerData(
				game.getWidth(),
				game.getHeight(),
				game.getWidth() - 30,
				game.getHeight() / 2 - 50,
				10,
				100,
				SIDE.RIGHT,
			);
		else playerData = new PlayerData(game.getWidth(), game.getHeight(), 0, 0, 0, 0, SIDE.SPECTATOR);

		const gameUser: IUser = {
			user: { id: user.id, login: user.login, displayName: user.display_name, avatar: user.avatar },
			socketID: client.id,
			isConnected: true,
			isSpec: isSpec,
			playerData: playerData,
=======
			// client.emit('game_error', 'Already in Game session');
			return true;
		}
		const gameUser: IUser = {
			user: { id: user.id, login: user.login, displayName: user.display_name, avatar: user.avatar },
			socketID: client.id,
			isSpec: isSpec,
>>>>>>> c80165e (fix: github issue)
		};
		game.addUser(gameUser);
		return true;
	}

<<<<<<< HEAD
	public removeUserFromGame(client: Socket | any): IGame | null {
		const user: users = client.handshake.user;
		if (!user) return;
		const game: IGame = Game.getGamesFromUser(user.id);
		if (!game) return;
		const gameUser: IUser = game.getUser(user.id);
		if (!gameUser) return;
		game.removeUser(gameUser);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		if (!gameUser.isSpec && !game.isEnded()) {
			gameUser.isConnected = false;
=======
		if (!gameUser.isSpec) {
>>>>>>> ef81387 (feat(pong): Start Responsive)
=======
		if (!gameUser.isSpec && !game.isEnded) {
			console.log(game.getUsersInGame(), game.isEnded());
>>>>>>> 3afc756 (feat(pong): Continue responsivity)
=======
		if (!gameUser.isSpec && !game.isEnded()) {
			gameUser.isConnected = false;
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
			if (game.getUsersInGame().length === 0) {
				game.removeGame();
				return null;
			} else {
<<<<<<< HEAD
<<<<<<< HEAD
=======
				gameUser.isConnected = false;
>>>>>>> ef81387 (feat(pong): Start Responsive)
=======
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
				const winnerSide: SIDE = gameUser.playerData.side === SIDE.LEFT ? SIDE.RIGHT : SIDE.LEFT;
				const winner: IUser = game.getPlayerBySide(winnerSide);
				game.winGame(winner, gameUser);
				return null;
			}
		}
		return game;
	}

	public async addPoint(game: IGame, user: IUser) {
		user.playerData.score++;
		await this.prismaService.game_players.update({
			where: {
				player_id_game_id: {
					game_id: game.getGameID(),
					player_id: user.user.id,
				},
			},
			data: {
				score: user.playerData.score,
			},
		});
	}

<<<<<<< HEAD
	public gameVerification(client: Socket, gameUID: string, userID: number): IUser | null {
		const game: IGame = this.getGame(gameUID);
		if (!game) {
			client.emit('game-error', 'Game Error, no game found');
			client.disconnect();
			return null;
		}
		if (!game.userIsInGame(userID)) {
			client.emit('game-error', 'User is not in the game');
			client.disconnect();
			return null;
		}
		const player = game.getUser(userID);
		if (!player) {
			client.emit('game-error', 'User is not in the game');
			client.disconnect();
			return null;
		}
		return player;
	}

	public getUserFromRequest(client: Socket | any): users | null {
		const user: users = client.handshake.user;
		if (!user) {
			client.emit('error', 'Invalid token');
			client.disconnect();
			return null;
		}
		return user;
	}

	public async addPoint(game: IGame, user: IUser) {
		user.playerData.score++;
		await this.prismaService.game_players.update({
			where: {
				player_id_game_id: {
					game_id: game.getGameID(),
					player_id: user.user.id,
				},
			},
			data: {
				score: user.playerData.score,
			},
		});
	}

	public async winGame(game: IGame, user: IUser) {
		await this.prismaService.game_players.update({
			where: {
				player_id_game_id: {
					game_id: game.getGameID(),
					player_id: user.user.id,
				},
			},
			data: {
				is_win: true,
			},
		});
	}

=======
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
	public gameVerification(client: Socket, gameUID: string, userID: number): IUser | null {
		const game: IGame = this.getGame(gameUID);
		if (!game) {
			client.emit('game-error', 'Game Error, no game found');
			client.disconnect();
			return null;
		}
		if (!game.userIsInGame(userID)) {
			client.emit('game-error', 'User is not in the game');
			client.disconnect();
			return null;
		}
		const player = game.getUser(userID);
		if (!player) {
			client.emit('game-error', 'User is not in the game');
			client.disconnect();
			return null;
		}
		return player;
	}

	public getUserFromRequest(client: Socket | any): users | null {
		const user: users = client.handshake.user;
		if (!user) {
			client.emit('error', 'Invalid token');
			client.disconnect();
			return null;
		}
		return user;
=======
	public removeUserFromGame(client: Socket | any): void {
		console.log('removeUserFromGame');
		const user: users = client.handshake.user;
		console.log('user : ', user);
		if (!user) return;
		console.log('user : ', user.id);
		const game: IGame = Game.getGamesFromUser(user.id);
		if (!game) return;
		const gameUser = game.getUser(user.id);
		if (!gameUser) return;
		game.removeUser(gameUser);

		if (game.getUsersInGame.length === 0) {
			game.endGame();
		}
>>>>>>> c80165e (fix: github issue)
	}
}
