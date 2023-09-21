import { Module } from '@nestjs/common';
import { Gateway } from './gateway.websocket';
import { GameGateway } from './game.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
	providers: [Gateway, GameGateway, JwtService],
})
export class GatewayModule {}
