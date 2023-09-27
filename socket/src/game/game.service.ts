import { Injectable } from '@nestjs/common';
import { GameJoinDto } from './dto/game-join.dto';
import { Game } from './impl/Game';
import { IGame } from './impl/interfaces/IGame';
import { users } from '@prisma/client';
import { IUser } from './impl/interfaces/IUser';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class GameService {
	private waitingConnections: Map<number, GameJoinDto> = new Map<number, GameJoinDto>();
	private games: Map<string, Game> = new Map<string, Game>();

	constructor(private authService: AuthService) {}

	public addWaitingConnection(joinUser: GameJoinDto) {
		this.waitingConnections.set(joinUser.userID, joinUser);
	}

	public isUserWaiting(gameUID: string, userID: number): GameJoinDto | null {
		console.log(this.waitingConnections);
		console.log(userID);
		console.log(gameUID);
		if (!this.waitingConnections.has(userID)) return null;
		const wainting = this.waitingConnections.get(userID);
		if (wainting.gameUID !== gameUID) return null;
		return wainting;
	}

	public gameExists(gameUID: string): boolean {
		return this.games.has(gameUID);
	}

	public getGame(gameUID: string): IGame {
		return this.games.get(gameUID);
	}

	public createGame(gameUID: string): IGame {
		const game = new Game(gameUID);
		this.games.set(gameUID, game);
		return game;
	}

	public addUserToGame(game: IGame, client: Socket, isSpec: boolean): boolean {
		const user: users = this.authService.getAuthentifiedUser(client.id);
		if (!user) {
			client.emit('game_error', 'Unverified user');
			return false;
		}
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
		const gameUser2: IUser = {
			user: { id: 2, login: 'norminet', displayName: 'Norminet', avatar: 'null' },
			socketID: 'null',
			isSpec: true,
		};
		if (game.userIsInGame(2)) return true;
		game.addUser(gameUser2);
		return true;
	}
}
