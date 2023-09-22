import { Module } from '@nestjs/common';
import { Gateway } from './gateway.websocket';
import { GameGateway } from './game.gateway';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
	providers: [Gateway, GameGateway, AuthService, JwtService],
})
export class GatewayModule {}
