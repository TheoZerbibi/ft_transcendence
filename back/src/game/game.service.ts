import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { Prisma, User } from '@prisma/client';
import { UUID } from 'crypto';
import { GameDto, GamePlayerDto } from './dto';
import { convertGameData } from './utils/ConvertData';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GameService {
	constructor(
		private prisma: PrismaService,
		private readonly userService: UserService,
	) {}

	private async createGame(isPrivate: boolean): Promise<GameDto | undefined> {
		try {
			const gameUID = uuidv4();
			const game: GameDto = await this.prisma.game.create({
				data: {
					uid: gameUID,
					is_private: isPrivate,
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
					game_id: game.id,
					is_spec: spec,
					is_win: win,
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
					game_id: game.id,
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
					game_id: game.id,
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
		user: any,
		spec: boolean = false,
	): Promise<GamePlayerDto | undefined> {
		try {
			const gamePlayer: GamePlayerDto = await this.prisma.gamePlayer.create({
				data: {
					player_id: user.id,
					game_id: game.id,
					is_spec: spec,
					is_win: false,
				},
			});
			return gamePlayer;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					return;
				}
			}
			const player = await this.getPlayer(game);
			if (!player) this.deleteGame(game);
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
					player_id: user.id,
					is_win: isWin,
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

	async createNewGame(isPrivate: boolean): Promise<GameDto> {
		try {
			const game: GameDto = await this.createGame(isPrivate);
			return game;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new ForbiddenException('Error during game creation');
			}
			throw e;
		}
	}

	async joinGame(user: User, uid: string): Promise<any> {
		try {
			let gamePlayer;
			const game: GameDto = await this.getGame(uid as UUID);
			const gameHistory = await this.getGamePlayer(user);
			const playersInGame = await this.getAllPlayer(game);

			for (const player of playersInGame) {
				if (player.player_id === user.id) {
					// if (!player.is_spec) throw new ForbiddenException('User already in this game.');
					// else
					return { ...game, ...player };
				}
			}
			if (playersInGame.length >= 2) gamePlayer = await this.createGamePlayer(game, user, true);
			else {
				if (gameHistory.length > 0) {
					for (const games of gameHistory) {
						if (games.isWin === false || games.game.endAt === null)
							gamePlayer = await this.createGamePlayer(game, user, true);
						else gamePlayer = await this.createGamePlayer(game, user);
					}
				} else if (playersInGame.length < 2) {
					gamePlayer = await this.createGamePlayer(game, user);
					if (playersInGame.length === 1) {
						game.started_at = new Date();
						await this.prisma.game.update({
							where: { id: game.id },
							data: { started_at: new Date() },
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
					started_at: null,
					end_at: null,
					is_private: false,
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

	async getMatchHistory(): Promise<any> {
		try {
			const games: Array<any> = await this.prisma.game.findMany({
				where: {
					end_at: {
						not: null,
					},
				},
				orderBy: {
					end_at: 'desc',
				},
			});
			if (!games) return { games: null };
			for (const game of games) {
				const playersInGame: Array<GamePlayerDto> = await this.getAllPlayer(game);
				const activePlayers = playersInGame.filter((player) => !player.is_spec);
				for (let i = 0; i < activePlayers.length; i++) {
					const prismaUser = await this.userService.getUserById(activePlayers[i].player_id);
					activePlayers[i] = { ...activePlayers[i], ...prismaUser };
				}
				game.gamePlayer = activePlayers;
			}
			return games;
		} catch (e) {
			throw e;
		}
	}

	async getMatchHistoryByUser(user: User): Promise<any> {
		try {
			const games: Array<any> = await this.prisma.game.findMany({
				where: {
					gamePlayer: {
						some: {
							player_id: user.id,
						},
					},
				},
				include: {
					gamePlayer: true,
				},
				orderBy: {
					end_at: 'desc',
				},
			});
			if (!games) return { games: null };
			for (const game of games) {
				const playersInGame: Array<GamePlayerDto> = await this.getAllPlayer(game);
				const activePlayers = playersInGame.filter((player) => !player.is_spec);
				for (let i = 0; i < activePlayers.length; i++) {
					const prismaUser = await this.userService.getUserById(activePlayers[i].player_id);
					activePlayers[i] = { ...activePlayers[i], ...prismaUser };
				}
				game.gamePlayer = activePlayers;
			}
			return games;
		} catch (e) {
			throw e;
		}
	}

	async getGameStatByUser(user: User): Promise<any> {
		try {
			let defeat: number = 0;
			let win: number = 0;
			let total: number = 0;
			const games: Array<any> = await this.prisma.game.findMany({
				where: {
					gamePlayer: {
						some: {
							player_id: user.id,
						},
					},
				},
				include: {
					gamePlayer: true,
				},
			});
			if (!games) return { games: null };
			for (const game of games) {
				const playersInGame: Array<GamePlayerDto> = await this.getAllPlayer(game);
				for (const player of playersInGame) {
					if (player.is_spec || player.player_id !== user.id) continue;
					if (player.is_win) win++;
					else defeat++;
					total++;
				}
			}
			return { win: win, defeat: defeat, totalGame: total };
		} catch (e) {
			throw e;
		}
	}

	async getOngoingGame(): Promise<any> {
		try {
			const games: Array<any> = await this.prisma.game.findMany({
				where: {
					started_at: {
						not: null,
					},
					end_at: null,
				},
			});
			if (!games) return { games: null };
			for (const game of games) {
				const playersInGame: Array<GamePlayerDto> = await this.getAllPlayer(game);
				const activePlayers = playersInGame.filter((player) => !player.is_spec);
				for (let i = 0; i < activePlayers.length; i++) {
					const prismaUser = await this.userService.getUserById(activePlayers[i].player_id);
					activePlayers[i] = { ...activePlayers[i], ...prismaUser };
				}
				game.players = activePlayers;
			}
			return games;
		} catch (e) {
			throw e;
		}
	}

	async getLeaderboard(): Promise<any> {
		try {
			const games: Array<any> = await this.prisma.game.findMany({
				where: {
					end_at: {
						not: null,
					},
				},
			});
			if (!games) return { games: null };
			for (const game of games) {
				const playersInGame: Array<GamePlayerDto> = await this.getAllPlayer(game);
				const activePlayers = playersInGame.filter((player) => !player.is_spec);
				game.players = activePlayers;
			}
			const leaderboard = await this.generateLeadeboard(games);
			return leaderboard;
		} catch (e) {
			throw e;
		}
	}

	async generateLeadeboard(games: Array<any>): Promise<Array<any>> {
		const leaderboard = [];
		for (const game of games) {
			for (const player of game.players) {
				if (player.is_win === false) continue;
				const index = leaderboard.findIndex((user) => user.id === player.player_id);
				if (index === -1) {
					const user = await this.userService.getUserById(player.player_id);
					leaderboard.push({
						id: player.player_id,
						score: 1,
						avatar: user.avatar,
						login: user.login,
						displayName: user.display_name,
					});
				} else {
					leaderboard[index].score += 1;
				}
			}
		}
		return leaderboard;
	}

	async getGameStat(gameUID: string): Promise<any> {
		try {
			const game: GameDto = await this.getGame(gameUID as UUID);
			const playersInGame: Array<GamePlayerDto> = await this.getAllPlayer(game);
			const players: Array<any> = [];
			for (const player of playersInGame) {
				if (player.is_spec) continue;
				const user: User = await this.prisma.user.findUnique({
					where: {
						id: player.player_id,
					},
				});
				players.push({ ...player, user });
			}
			const response = convertGameData(players, game);
			return response;
		} catch (e) {
			throw e;
		}
	}
}
