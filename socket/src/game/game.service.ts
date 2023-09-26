import { Injectable } from '@nestjs/common';
import { GameJoinDto } from './dto/game-join.dto';
import { Socket } from 'socket.io';

@Injectable()
export class GameService {
	private games: Map<string, any> = new Map<string, any>();
	private clients: Map<Socket, string> = new Map<Socket, string>();

	public joinGame(client: Socket, game: GameJoinDto): string | undefined {
		const gameUID = game.uid;
		const userID = game.userID;
		const gameInstance = this.games.get(gameUID);
		if (gameInstance === undefined) {
			return undefined;
		}
		const player = gameInstance.players.get(userID);
		if (player === undefined) {
			return undefined;
		}
		return player.uid;
	}

	public createGame(gameUID: string): string | undefined {
		const gameInstance = this.games.get(gameUID);
		if (gameInstance === undefined) {
			this.games.set(gameUID, {
				players: new Map<string, any>(),
			});
			return gameUID;
		}
		return undefined;
	}

	public getGameInfo(gameUID: string): any | undefined {
		const gameInstance = this.games.get(gameUID);
		if (gameInstance === undefined) {
			return undefined;
		}
		return gameInstance;
	}

	public gameExist(gameUID: string): boolean {
		const gameInstance = this.games.get(gameUID);
		if (gameInstance === undefined) return false;
		return true;
	}

	public removePlayer(client: Socket): void {
		const gameUID = this.clients.get(client);
		if (gameUID === undefined) return;
		const gameInstance = this.games.get(gameUID);
		if (gameInstance === undefined) return;
		const playerUID = this.clients.get(client);
		if (playerUID === undefined) return;
		gameInstance.players.delete(playerUID);
		this.clients.delete(client);
		console.log(client);
	}

	public deleteGame(gameUID: string): boolean {
		const gameInstance = this.games.get(gameUID);
		if (gameInstance === undefined) {
			return false;
		}
		this.games.delete(gameUID);
		return true;
	}
}
