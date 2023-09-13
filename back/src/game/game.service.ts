import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {v4 as uuidv4} from 'uuid';
import { Prisma, User } from '@prisma/client';
import { GameDto } from './dto/game.dto';
import { GamePlayerDto } from './dto/game-player.dto';

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

	private async createGamePlayer(game: GameDto, user: User): Promise<GamePlayerDto | undefined> {
		try {
			const gamePlayer: GamePlayerDto = await this.prisma.gamePlayer.create({
				data: {
					playerId: user.id,
					gameId: game.id,
					isSpec: false,
					isWin: false,
				},
			});
			return gamePlayer;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new ForbiddenException('Error during gamePlayer creation');
			}
			throw e;
		}
	}

	async createNewGame(user: User): Promise<GameDto> {
		try {
			console.log(user);
			const game: GameDto = await this.createGame();
			await this.createGamePlayer(game, user);

			return game;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new ForbiddenException('Error during game creation');
			}
			throw e;
		}
	}
}
