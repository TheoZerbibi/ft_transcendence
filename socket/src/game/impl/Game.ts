import { PrismaService } from 'src/prisma/prisma.service';
import { IGame } from './interfaces/IGame';
import { IUser } from './interfaces/IUser';
import { Logger } from '@nestjs/common';

export class Game implements IGame {
	private logger: Logger = new Logger('GameClass');
	private usersInGame: Array<IUser> = [];
	public inProgress: boolean = false;

	private static games: Map<string, any> = new Map<string, any>();

	constructor(
		private gameUID: string,
		private prismaService: PrismaService,
		private isEnd: boolean,
	) {
		try {
			this.logger.debug('Before set:', Game.games.get(this.gameUID));
			Game.games.set(this.gameUID, this);
			this.logger.debug('After set: ', Game.games.get(this.gameUID));
		} catch (err) {
			this.logger.error(err);
		}
	}

	isInProgress(): boolean {
		return this.inProgress;
	}

	public static getGames(): Map<string, IGame> {
		return this.games;
	}

	public static getGamesFromUID(gameUID: string): IGame {
		return this.games.get(gameUID);
	}

	public static getGamesFromUser(userID: number): IGame {
		console.log(userID);
		for (const game of this.games.values()) {
			// console.log(game);
			if (game.userIsInGame(userID)) return game;
		}
		console.log('after');
		return null;
	}

	isEnded(): boolean {
		return this.isEnd;
	}

	getGameUID(): string {
		return this.gameUID;
	}

	addUser(user: IUser): void {
		this.usersInGame.push(user);
	}

	removeUser(user: IUser): void {
		this.usersInGame = this.usersInGame.filter((u) => u.user.id !== user.user.id);
	}

	getUser(userID: number) {
		return this.usersInGame.find((user) => user.user.id === userID);
	}

	getUsersInGame(): Array<IUser> {
		return this.usersInGame.filter((user) => !user.isSpec);
	}

	getSpectatorsInGame(): Array<IUser> {
		return this.usersInGame.filter((user) => user.isSpec);
	}

	getAllUsersInGame(): Array<IUser> {
		return this.usersInGame;
	}

	startGame(): void {
		this.inProgress = true;
		console.log('Game started');
		// throw new Error('Method not implemented.');
	}

	async endGame(): Promise<void> {
		this.isEnd = true;
		console.log('Game ended');
		await this.prismaService.games.update({
			where: {
				uid: this.gameUID,
			},
			data: {
				end_at: new Date(),
			},
		});
		// throw new Error('Method not implemented.');
	}

	userIsInGame(userId: number): boolean {
		return this.usersInGame.some((user) => user.user.id === userId);
	}

	userIsSpectator(userId: number): boolean {
		return this.usersInGame.some((user) => user.user.id === userId && user.isSpec);
	}
}
