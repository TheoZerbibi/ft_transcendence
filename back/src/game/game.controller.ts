import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('game')
@ApiBearerAuth()
@ApiTags('Game')
export class GameController {
	constructor(private gameService: GameService) {}

	@UseGuards(JwtGuard)
	@Post('createGame')
	@ApiOperation({ summary: 'Create a new Game' })
	@ApiBearerAuth('JWT-auth')
	@HttpCode(HttpStatus.OK)
	createNewGame(@GetUser() user: User) {
		return this.gameService.createNewGame(user);
	}
}
