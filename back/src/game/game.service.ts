import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { Prisma, User } from '@prisma/client';
import { GameDto } from './dto/game.dto';
import { GamePlayerDto } from './dto/game-player.dto';
import { UUID } from 'crypto';

@Injectable()
export class GameService {
	constructor(private prisma: PrismaService) {}

	private async createGame(): Promise<GameDto | undefined> {
		try {
			const gameUUID = uuidv4();
			const game: GameDto = await this.prisma.game.create({
				data: {
					uid: gameUUID,
				},
			});
			return game;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new ForbiddenException('Error during game creation');
			}
			throw e;
		}
	}

	private async getPlayer(
		game: GameDto,
		spec: boolean = false,
		win: boolean = false,
	): Promise<Array<GamePlayerDto> | undefined> {
		try {
			const gamePlayer: Array<GamePlayerDto> = await this.prisma.gamePlayer.findMany({
				where: {
					gameId: game.id,
					isSpec: spec,
					isWin: win,
				},
			});
			return gamePlayer;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new ForbiddenException('No Player Found');
			}
			throw e;
		}
	}

	private async getAllPlayer(game: GameDto): Promise<Array<GamePlayerDto> | undefined> {
		try {
			const gamePlayer: Array<GamePlayerDto> = await this.prisma.gamePlayer.findMany({
				where: {
					gameId: game.id,
				},
			});
			return gamePlayer;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new ForbiddenException('No Player Found');
			}
			throw e;
		}
	}

	private async deleteGame(game: GameDto) {
		try {
			await this.prisma.gamePlayer.deleteMany({
				where: {
					gameId: game.id,
				},
			});
			await this.prisma.game.delete({
				where: {
					id: game.id,
				},
			});
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new ForbiddenException('No Player Found');
			}
			throw e;
		}
	}

	private async createGamePlayer(
		game: GameDto,
		user: User,
		spec: boolean = false,
	): Promise<GamePlayerDto | undefined> {
		console.log('createGamePlayer');
		try {
			console.log(game);
			const gamePlayer: GamePlayerDto = await this.prisma.gamePlayer.create({
				data: {
					playerId: user.id,
					gameId: game.id,
					isSpec: spec,
					isWin: false,
				},
			});
			return gamePlayer;
		} catch (e) {
			const player = await this.getPlayer(game);
			if (!player) this.deleteGame(game);
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new ForbiddenException('Error during gamePlayer creation');
			}
			throw e;
		}
	}

	private async getGame(uid: UUID): Promise<GameDto> {
		try {
			const game: GameDto = await this.prisma.game.findUnique({
				where: {
					uid: uid,
				},
			});
			if (!game) throw new ForbiddenException('No game found');
			return game;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new ForbiddenException('No game found');
			}
			throw e;
		}
	}

	private async getGamePlayer(user: User, isWin: boolean = false): Promise<Array<any> | null> {
		try {
			const gamePlayer: Array<any> = await this.prisma.gamePlayer.findMany({
				where: {
					playerId: user.id,
					isWin: isWin,
				},
				include: {
					game: true,
				},
			});
			if (!gamePlayer) return null;
			return gamePlayer;
		} catch (e) {
			throw e;
		}
	}

	async createNewGame(): Promise<GameDto> {
		try {
			const game: GameDto = await this.createGame();
			console.log(game);
			return game;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new ForbiddenException('Error during game creation');
			}
			throw e;
		}
	}

	async joinGame(user: User, uid: string): Promise<GameDto> {
		try {
			let gamePlayer;
			const game: GameDto = await this.getGame(uid as UUID);
			const gameHistory = await this.getGamePlayer(user);
			const playersInGame = await this.getAllPlayer(game);

			for (const player of playersInGame) {
				if (player.playerId === user.id) {
					if (!player.isSpec)
						throw new ForbiddenException('User already in this game.');
					else return { ...game, ...player };
				}
			}
			if (playersInGame.length >= 2) gamePlayer = await this.createGamePlayer(game, user, true);
			else {
				if (gameHistory.length > 0) {
					console.log('Player : ', gameHistory);
					for (const games of gameHistory) {
						if (games.isWin === false || games.game.endAt === null)
							gamePlayer = await this.createGamePlayer(game, user, true);
					}
				} else if (playersInGame.length < 2) {
					gamePlayer = await this.createGamePlayer(game, user);
					if (playersInGame.length === 1) {
						game.startedAt = new Date();
						await this.prisma.game.update({
							where: { id: game.id },
							data: { startedAt: new Date() },
						});
					}
				}
			}
			return { ...game, ...gamePlayer };
		} catch (e) {
			throw e;
		}
	}

	async getEmptyGame(): Promise<any> {
		try {
			const games: Array<GameDto> = await this.prisma.game.findMany({
				where: {
					startedAt: null,
				},
			});
			if (!games) return { uid: null };
			games.forEach(async (game, index) => {
				const playersInGame: Array<GamePlayerDto> = await this.getAllPlayer(game);

				if (playersInGame) {
					if (playersInGame.length >= 2) games.slice(index, 1);
				}
			});
			if (games.length === 0) return { uid: null };
			return games[0];
		} catch (e) {
			throw e;
		}
	}
}
