import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { RedisService } from 'src/redis/redis.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [JwtModule.register({})],
	controllers: [GameController],
	providers: [GameService, UserService, RedisService],
})
export class GameModule {}
