import { PrismaService } from 'src/prisma/prisma.service';
import { IGame } from './interfaces/IGame';
import { IUser } from './interfaces/IUser';
import { Logger } from '@nestjs/common';
import { IGameData } from './interfaces/IGameData';
import { Ball } from '../engine/Ball';
import { SIDE } from '../engine/enums/Side';

export class Game implements IGame {
	private logger: Logger = new Logger('GameClass');
	private usersInGame: Array<IUser> = [];
	private loop: boolean = false;
	private width: number = 700;
	private height: number = 400;

	public inProgress: boolean = false;
	public gameData: IGameData = { ball: new Ball(this.width, this.height), startingDate: null, endingDate: null };
	public pause: boolean = false;

	private static games: Map<string, any> = new Map<string, any>();

	constructor(
		private prismaService: PrismaService,
		private id: number,
		private gameUID: string,
		private isEnd: boolean,
	) {
		try {
			Game.games.set(this.gameUID, this);
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
		for (const game of this.games.values()) {
			if (game.userIsInGame(userID)) return game;
		}
		return null;
	}

	isEnded(): boolean {
		return this.isEnd;
	}

	getHeight(): number {
		return this.height;
	}

	getWidth(): number {
		return this.width;
	}

	getGameUID(): string {
		return this.gameUID;
	}

	getGameID(): number {
		return this.id;
	}

	addUser(user: IUser): void {
		this.usersInGame.push(user);
		if (user.playerData.side !== SIDE.SPECTATOR) this.gameData.ball.setPlayerSide(user.playerData);
	}

	removeUser(user: IUser): void {
		this.usersInGame = this.usersInGame.filter((u) => u.user.id !== user.user.id);
	}

	getUser(userID: number) {
		return this.usersInGame.find((user) => user.user.id === userID);
	}

	getUsersInGame(): Array<IUser> {
		return this.usersInGame
			.filter((user) => !user.isSpec)
			.map(({ user, isSpec, playerData }) => ({ user, isSpec, playerData, socketID: 'null' }));
	}

	getSpectatorsInGame(): Array<IUser> {
		return this.usersInGame
			.filter((user) => user.isSpec)
			.map(({ user, isSpec, playerData }) => ({ user, isSpec, playerData, socketID: 'null' }));
	}

	getAllUsersInGame(): Array<IUser> {
		return this.usersInGame.map(({ user, isSpec, playerData }) => ({ user, isSpec, playerData, socketID: 'null' }));
	}

	getPlayerBySide(side: SIDE): IUser {
		return this.usersInGame.find((user) => user.playerData && user.playerData.side === side);
	}

	async startGame(): Promise<void> {
		this.inProgress = true;
		this.gameData.startingDate = new Date();
		await this.prismaService.games.update({
			where: {
				uid: this.gameUID,
			},
			data: {
				started_at: this.gameData.startingDate,
			},
		});
	}

	async endGame(): Promise<void> {
		this.isEnd = true;
		this.gameData.endingDate = new Date();
		await this.prismaService.games.update({
			where: {
				uid: this.gameUID,
			},
			data: {
				end_at: this.gameData.endingDate,
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

	setPause(pause: boolean, time: number) {
		this.pause = pause;
		setTimeout(() => {
			this.pause = false;
		}, time);
	}

	isInPause(): boolean {
		return this.pause;
	}

	private gameLoop() {
		const loop = setInterval(() => {
			if (!this.isEnded()) {
				if (!this.pause) this.gameData.ball.update();
			} else {
				clearInterval(loop);
			}
		}, 1);
	}
}
