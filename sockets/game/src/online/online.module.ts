import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { OnlineService } from './online.service';
import { OnlineGateway } from './online.gateway';

@Module({
	providers: [OnlineGateway, AuthService, JwtService, OnlineService],
	exports: [OnlineGateway],
})
export class OnlineModule {}
