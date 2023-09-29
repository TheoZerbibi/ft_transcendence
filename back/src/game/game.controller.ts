import { Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { RedisService } from 'src/redis/redis.service';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Controller('game')
@ApiBearerAuth()
@ApiTags('Game')
export class GameController {
	constructor(
		private gameService: GameService,
		private readonly redisService: RedisService,
		private readonly rabbitMqService: RabbitmqService,
	) {}

	@UseGuards(JwtGuard)
	@Post('createGame')
	@ApiOperation({ summary: 'Create a new Game' })
	@ApiBearerAuth('JWT-auth')
	@HttpCode(HttpStatus.OK)
	createNewGame(@GetUser() user: User) {
		console.log(user);
		return this.gameService.createNewGame();
	}

	@UseGuards(JwtGuard)
	@Get('getEmptyGame')
	@ApiOperation({ summary: 'Get game wainting for a second opponant.' })
	@ApiBearerAuth('JWT-auth')
	@HttpCode(HttpStatus.OK)
	getEmptyGame() {
		return this.gameService.getEmptyGame();
	}

	@UseGuards(JwtGuard)
	@Post(':uuid')
	@ApiOperation({ summary: 'Join a Game' })
	@ApiBearerAuth('JWT-auth')
	@HttpCode(HttpStatus.OK)
	async joinGame(@GetUser() user: User, @Param('uuid') gameUUID: string) {
		// this.rabbitMqService.hello();
		const response = await this.gameService.joinGame(user, gameUUID);
		if (response) {
			await this.redisService.connectClientToSocket(gameUUID, user.id, response.is_spec);
			return response;
		}
		return { error: 'Game not found' };
	}
}
