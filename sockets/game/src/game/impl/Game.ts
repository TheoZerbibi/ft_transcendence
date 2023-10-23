import { PrismaService } from 'src/prisma/prisma.service';
import { IGame } from './interfaces/IGame';
import { IUser } from './interfaces/IUser';
import { Logger } from '@nestjs/common';
import { IGameData } from './interfaces/IGameData';
import { Ball } from '../engine/Ball';

export class Game implements IGame {
	private logger: Logger = new Logger('GameClass');
	private usersInGame: Array<IUser> = [];
	private loop: boolean = false;
	public inProgress: boolean = false;
	public gameData: IGameData = { ball: new Ball() };

	private static games: Map<string, any> = new Map<string, any>();

	constructor(
		private prismaService: PrismaService,
		private gameUID: string,
		private isEnd: boolean,
	) {
		try {
			this.logger.debug('Before set:', Game.games.get(this.gameUID));
			Game.games.set(this.gameUID, this);
			this.logger.debug(this.gameData.ball);
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

	async startGame(): Promise<void> {
		this.inProgress = true;
		console.log('Game started');
		await this.prismaService.games.update({
			where: {
				uid: this.gameUID,
			},
			data: {
				started_at: new Date(),
			},
		});
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
	}

	userIsInGame(userId: number): boolean {
		return this.usersInGame.some((user) => user.user.id === userId);
	}

	userIsSpectator(userId: number): boolean {
		return this.usersInGame.some((user) => user.user.id === userId && user.isSpec);
	}

	getGameData() {
		return this.gameData;
	}

	startGameLoop() {
		if (this.loop) return;
		this.loop = true;
		this.gameLoop();
	}

	private gameLoop() {
		const loop = setInterval(() => {
			if (!this.isEnded()) {
				this.gameData.ball.update();
			} else {
				clearInterval(loop);
			}
		}, 1);
	}
}
