import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {v4 as uuidv4} from 'uuid';
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
			const game: GameDto = await this.getGame(uid as UUID);
			const players = await this.getPlayer(game, false);
			if (players.length >= 1) {
				for (const player of players) {
					if (player.playerId === user.id) throw new ForbiddenException('User already in game');
				}
				if (players.length >= 2) await this.createGamePlayer(game, user, true);
			} else await this.createGamePlayer(game, user);

			return game;
		} catch (e) {
			throw e;
		}
	}
}
