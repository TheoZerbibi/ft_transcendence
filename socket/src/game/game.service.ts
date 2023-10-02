import { Injectable } from '@nestjs/common';
import { GameJoinDto } from './dto/game-join.dto';
import { Game } from './impl/Game';
import { IGame } from './impl/interfaces/IGame';
import { users } from '@prisma/client';
import { IUser } from './impl/interfaces/IUser';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {
	private waitingConnections: Map<number, GameJoinDto> = new Map<number, GameJoinDto>();

	constructor(private prismaService: PrismaService) {}

	public addWaitingConnection(joinUser: GameJoinDto) {
		this.waitingConnections.set(joinUser.userID, joinUser);
	}

	public isUserWaiting(gameUID: string, userID: number): GameJoinDto | null {
		console.log(`isUserWaiting :`, this.waitingConnections);
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

	public createGame(gameUID: string, isEnded: boolean = false): IGame {
		console.log('new game : ', gameUID, ' isEnded :', isEnded);
		const game = new Game(gameUID, this.prismaService, isEnded);
		console.log('new game created');
		return game;
	}

	public addUserToGame(game: IGame, client: Socket, user: users, isSpec: boolean): boolean {
		if (game.userIsInGame(user.id)) {
			// client.emit('game_error', 'Already in Game session');
			return true;
		}
		const gameUser: IUser = {
			user: { id: user.id, login: user.login, displayName: user.display_name, avatar: user.avatar },
			socketID: client.id,
			isSpec: isSpec,
		};
		game.addUser(gameUser);
		return true;
	}

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
	}
}
