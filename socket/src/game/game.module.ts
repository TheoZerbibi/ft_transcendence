import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { GameService } from './game.service';

@Module({
	providers: [GameGateway, AuthService, JwtService, GameService],
	exports: [GameGateway],
})
export class GameModule {}
