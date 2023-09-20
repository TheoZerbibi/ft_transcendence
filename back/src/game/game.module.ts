import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { RedisService } from 'src/redis/redis.service';

@Module({
	controllers: [GameController],
	providers: [GameService, RedisService],
})
export class GameModule {}
