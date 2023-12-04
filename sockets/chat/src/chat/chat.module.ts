import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { ChatService } from './chat.service';

@Module({
	providers: [ChatGateway, AuthService, JwtService, ChatService],
	exports: [ChatGateway],
})
export class ChatModule {}
