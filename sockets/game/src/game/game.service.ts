import { Injectable } from '@nestjs/common';
import { GameJoinDto } from './dto/game-join.dto';
import { Game } from './impl/Game';
import { IGame } from './impl/interfaces/IGame';
import { users } from '@prisma/client';
import { IUser } from './impl/interfaces/IUser';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlayerData } from './engine/PlayerData';
import { SIDE } from './engine/enums/Side';
import { IPlayerData } from './impl/interfaces/IPlayerData';

@Injectable()
export class GameService {
	private waitingConnections: Map<number, GameJoinDto> = new Map<number, GameJoinDto>();

	constructor(private prismaService: PrismaService) {}

	public addWaitingConnection(joinUser: GameJoinDto) {
		this.waitingConnections.set(joinUser.userID, joinUser);
	}

	public isUserWaiting(gameUID: string, userID: number): GameJoinDto | null {
		if (!this.waitingConnections.has(userID)) return null;
		const wainting = this.waitingConnections.get(userID);
		if (wainting.gameUID !== gameUID) return null;
		return wainting;
	}

	public gameExists(gameUID: string): boolean {
		return Game.getGamesFromUID(gameUID) !== undefined;
	}

	public getGame(gameUID: string): IGame {
		return Game.getGamesFromUID(gameUID);
	}

	public createGame(gameID: number, gameUID: string, isEnded: boolean = false): IGame {
		const game = new Game(this.prismaService, gameID, gameUID, isEnded);
		return game;
	}

	public addUserToGame(game: IGame, client: Socket, user: users, isSpec: boolean): boolean {
		if (game.userIsInGame(user.id)) {
			// client.emit('game-error', 'Already in Game session');
			return true;
		}
		let side: SIDE;
		if (game.getUsersInGame().length === 0) side = SIDE.LEFT;
		else if (game.getUsersInGame().length === 1) side = SIDE.RIGHT;
		else side = SIDE.SPECTATOR;
		if (isSpec) side = SIDE.SPECTATOR;
		const gameUser: IUser = {
			user: { id: user.id, login: user.login, displayName: user.display_name, avatar: user.avatar },
			socketID: client.id,
			isSpec: isSpec,
			playerData: new PlayerData(game.gameData.ratio, side),
		};
		game.addUser(gameUser);
		return true;
	}

	public removeUserFromGame(client: Socket | any): IGame | null {
		const user: users = client.handshake.user;
		if (!user) return;
		const game: IGame = Game.getGamesFromUser(user.id);
		if (!game) return;
		const gameUser = game.getUser(user.id);
		if (!gameUser) return;
		game.removeUser(gameUser);

		if (!gameUser.isSpec) {
			if (gameUser.playerData.side === SIDE.LEFT) this.winGame(game, gameUser);
			else if (gameUser.playerData.side === SIDE.RIGHT) this.winGame(game, gameUser);
			game.endGame();
			return null;
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
}
