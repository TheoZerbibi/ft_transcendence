import { Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { RedisService } from 'src/redis/redis.service';

@UseGuards(JwtGuard)
@Controller('game')
@ApiBearerAuth()
@ApiTags('Game')
export class GameController {
	constructor(
		private gameService: GameService,
		private readonly redisService: RedisService,
	) {}

	@Get('getEmptyGame')
	@ApiOperation({ summary: 'Get game waiting for a second opponent.' })
	@ApiBearerAuth('JWT-auth')
	@HttpCode(HttpStatus.OK)
	getEmptyGame() {
		return this.gameService.getEmptyGame();
	}

	@Get('getMatchHistory')
	@ApiOperation({ summary: 'Get all history of match.' })
	@ApiBearerAuth('JWT-auth')
	@HttpCode(HttpStatus.OK)
	getMatchHistory() {
		return this.gameService.getMatchHistory();
	}

	@Get('getOngoingGame')
	@ApiOperation({ summary: 'Get all game ongoing.' })
	@ApiBearerAuth('JWT-auth')
	@HttpCode(HttpStatus.OK)
	getOngoingGame() {
		return this.gameService.getOngoingGame();
	}

	@Get('getLeaderboard')
	@ApiOperation({ summary: 'Get match leaderboard.' })
	@ApiBearerAuth('JWT-auth')
	@HttpCode(HttpStatus.OK)
	getLeaderboard() {
		return this.gameService.getLeaderboard();
	}

	@Post('createGame')
	@ApiOperation({ summary: 'Create a new Game' })
	@ApiBearerAuth('JWT-auth')
	@HttpCode(HttpStatus.OK)
	createNewGame() {
		return this.gameService.createNewGame();
	}

	@Get('getMyMatchHistory')
	@ApiOperation({ summary: 'Get all history of match.' })
	@ApiBearerAuth('JWT-auth')
	@HttpCode(HttpStatus.OK)
	getMyMatchHistory() {
		return this.gameService.getMatchHistory();
	}

	@Post(':uuid')
	@ApiOperation({ summary: 'Join a Game' })
	@ApiBearerAuth('JWT-auth')
	@HttpCode(HttpStatus.OK)
	async joinGame(@GetUser() user: User, @Param('uuid') gameUUID: string) {
		const response = await this.gameService.joinGame(user, gameUUID);
		if (response) {
			const isEnded: boolean = response.end_at ? true : false;
			await this.redisService.connectClientToSocket(response.id, gameUUID, user.id, response.is_spec, isEnded);
			if (isEnded) {
				const gameEnded = await this.gameService.getGameStat(gameUUID);
				return { ...gameEnded, isEnded: isEnded };
			}
			return response;
		}
		return { error: 'Game not found' };
	}
}
