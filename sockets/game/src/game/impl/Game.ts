import { PrismaService } from 'src/prisma/prisma.service';
import { IGame } from './interfaces/IGame';
import { IUser } from './interfaces/IUser';
import { Logger } from '@nestjs/common';
<<<<<<< HEAD
import { IGameData } from './interfaces/IGameData';
import { Ball } from '../engine/Ball';
import { SIDE } from '../engine/enums/Side';
=======
>>>>>>> c80165e (fix: github issue)

export class Game implements IGame {
	private logger: Logger = new Logger('GameClass');
	private usersInGame: Array<IUser> = [];
<<<<<<< HEAD
	private loop: boolean = false;
	private width: number = 700;
	private height: number = 400;

	public inProgress: boolean = false;
	public newPoint: boolean = false;
	public gameData: IGameData = { ball: new Ball(this.width, this.height), startingDate: null, endingDate: null };
	public pause: boolean = false;
	public winner: IUser;
<<<<<<< HEAD
<<<<<<< HEAD
	public loser: IUser;
=======
	public looser: IUser;
>>>>>>> 7cff344 (refactor(pong): Fix EndGame condition (Crash when player refresh))
=======
	public loser: IUser;
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
=======
	public inProgress: boolean = false;
>>>>>>> c80165e (fix: github issue)

	private static games: Map<string, any> = new Map<string, any>();

	constructor(
		private prismaService: PrismaService,
<<<<<<< HEAD
		private id: number,
=======
>>>>>>> c80165e (fix: github issue)
		private gameUID: string,
		private isEnd: boolean,
	) {
		try {
<<<<<<< HEAD
			Game.games.set(this.gameUID, this);
			this.gameData.ball.setGame(this);
=======
			this.logger.debug('Before set:', Game.games.get(this.gameUID));
			Game.games.set(this.gameUID, this);
			this.logger.debug('After set: ', Game.games.get(this.gameUID));
>>>>>>> c80165e (fix: github issue)
		} catch (err) {
			this.logger.error(err);
		}
	}

	isInProgress(): boolean {
		return this.inProgress;
	}

<<<<<<< HEAD
	async removeGame(): Promise<void> {
		this.isEnd = true;
		await this.prismaService.games.delete({
			where: {
				uid: this.gameUID,
			},
		});
		Game.games.delete(this.gameUID);
	}

=======
>>>>>>> c80165e (fix: github issue)
	public static getGames(): Map<string, IGame> {
		return this.games;
	}

	public static getGamesFromUID(gameUID: string): IGame {
		return this.games.get(gameUID);
	}

	public static getGamesFromUser(userID: number): IGame {
<<<<<<< HEAD
		for (const game of this.games.values()) {
			if (game.userIsInGame(userID)) return game;
		}
=======
		console.log(userID);
		for (const game of this.games.values()) {
			if (game.userIsInGame(userID)) return game;
		}
		console.log('after');
>>>>>>> c80165e (fix: github issue)
		return null;
	}

	isEnded(): boolean {
		return this.isEnd;
	}

<<<<<<< HEAD
	getHeight(): number {
		return this.height;
	}

	getWidth(): number {
		return this.width;
	}

=======
>>>>>>> c80165e (fix: github issue)
	getGameUID(): string {
		return this.gameUID;
	}

<<<<<<< HEAD
	getGameID(): number {
		return this.id;
	}

	addUser(user: IUser): void {
		this.usersInGame.push(user);
		if (user.playerData.side !== SIDE.SPECTATOR) this.gameData.ball.setPlayerSide(user.playerData);
=======
	addUser(user: IUser): void {
		this.usersInGame.push(user);
>>>>>>> c80165e (fix: github issue)
	}

	removeUser(user: IUser): void {
		this.usersInGame = this.usersInGame.filter((u) => u.user.id !== user.user.id);
	}

	getUser(userID: number) {
		return this.usersInGame.find((user) => user.user.id === userID);
	}

	getUsersInGame(): Array<IUser> {
<<<<<<< HEAD
		return this.usersInGame
			.filter((user) => !user.isSpec)
			.map(({ user, isSpec, playerData, isConnected }) => ({
				user,
				isSpec,
				playerData,
				isConnected,
				socketID: 'null',
			}));
	}

	getSpectatorsInGame(): Array<IUser> {
		return this.usersInGame
			.filter((user) => user.isSpec)
			.map(({ user, isSpec, playerData, isConnected }) => ({
				user,
				isSpec,
				playerData,
				isConnected,
				socketID: 'null',
			}));
	}

	getAllUsersInGame(): Array<IUser> {
		return this.usersInGame.map(({ user, isSpec, playerData, isConnected }) => ({
			user,
			isSpec,
			playerData,
			isConnected,
			socketID: 'null',
		}));
<<<<<<< HEAD
	}

	getPlayerBySide(side: SIDE): IUser {
		return this.usersInGame.find((user) => user.playerData && user.playerData.side === side);
=======
>>>>>>> 7cff344 (refactor(pong): Fix EndGame condition (Crash when player refresh))
	}

	getPlayerBySide(side: SIDE): IUser {
		return this.usersInGame.find((user) => user.playerData && user.playerData.side === side);
=======
		return this.usersInGame.filter((user) => !user.isSpec);
	}

	getSpectatorsInGame(): Array<IUser> {
		return this.usersInGame.filter((user) => user.isSpec);
	}

	getAllUsersInGame(): Array<IUser> {
		return this.usersInGame;
>>>>>>> c80165e (fix: github issue)
	}

	async startGame(): Promise<void> {
		this.inProgress = true;
<<<<<<< HEAD
		this.gameData.startingDate = new Date();
=======
		console.log('Game started');
>>>>>>> c80165e (fix: github issue)
		await this.prismaService.games.update({
			where: {
				uid: this.gameUID,
			},
			data: {
<<<<<<< HEAD
				started_at: this.gameData.startingDate,
=======
				started_at: new Date(),
>>>>>>> c80165e (fix: github issue)
			},
		});
	}

	async endGame(): Promise<void> {
		this.isEnd = true;
<<<<<<< HEAD
		this.gameData.endingDate = new Date();
=======
		console.log('Game ended');
>>>>>>> c80165e (fix: github issue)
		await this.prismaService.games.update({
			where: {
				uid: this.gameUID,
			},
			data: {
<<<<<<< HEAD
				end_at: this.gameData.endingDate,
=======
				end_at: new Date(),
>>>>>>> c80165e (fix: github issue)
			},
		});
	}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	async winGame(winner: IUser, loser: IUser) {
		this.winner = winner;
		this.loser = loser;
		await this.prismaService.game_players.update({
			where: {
				player_id_game_id: {
					game_id: this.getGameID(),
					player_id: winner.user.id,
				},
			},
			data: {
				is_win: true,
			},
		});
		await this.endGame();
=======
	winGame(winner: IUser, looser: IUser) {
		this.winner = winner;
		this.looser = looser;
		this.endGame();
>>>>>>> 7cff344 (refactor(pong): Fix EndGame condition (Crash when player refresh))
=======
	async winGame(winner: IUser, loser: IUser) {
		this.winner = winner;
		this.loser = loser;
		await this.prismaService.game_players.update({
			where: {
				player_id_game_id: {
					game_id: this.getGameID(),
					player_id: winner.user.id,
				},
			},
			data: {
				is_win: true,
			},
		});
		await this.endGame();
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
	}

=======
>>>>>>> c80165e (fix: github issue)
	userIsInGame(userId: number): boolean {
		return this.usersInGame.some((user) => user.user.id === userId);
	}

	userIsSpectator(userId: number): boolean {
		return this.usersInGame.some((user) => user.user.id === userId && user.isSpec);
	}
<<<<<<< HEAD

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

	async addPoint(side: SIDE) {
		const user: IUser = this.getPlayerBySide(side);
		if (!user) return;
		await this.prismaService.game_players.update({
			where: {
				player_id_game_id: {
					game_id: this.getGameID(),
					player_id: user.user.id,
				},
			},
			data: {
				score: user.playerData.score,
			},
		});
		user.playerData.score++;
		this.newPoint = true;
		this.setPause(true, 3000);
<<<<<<< HEAD
<<<<<<< HEAD
		const loserSide: SIDE = side === SIDE.LEFT ? SIDE.RIGHT : SIDE.LEFT;
		const loser: IUser = this.getPlayerBySide(loserSide);
		if (user.playerData.score >= 6) this.winGame(user, loser);
=======
		const looserSide: SIDE = side === SIDE.LEFT ? SIDE.RIGHT : SIDE.LEFT;
		const looser: IUser = this.getPlayerBySide(looserSide);
		if (user.playerData.score >= 11) this.winGame(user, looser);
>>>>>>> 3afc756 (feat(pong): Continue responsivity)
=======
		const loserSide: SIDE = side === SIDE.LEFT ? SIDE.RIGHT : SIDE.LEFT;
		const loser: IUser = this.getPlayerBySide(loserSide);
<<<<<<< HEAD
		if (user.playerData.score >= 11) this.winGame(user, loser);
>>>>>>> 6505030 (feat(pong): Responsivity & Design)
=======
		if (user.playerData.score >= 6) this.winGame(user, loser);
>>>>>>> 1f4dfd0 (feat(pong): Improve IA deplacement + add life visualation)
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
=======
>>>>>>> c80165e (fix: github issue)
}
