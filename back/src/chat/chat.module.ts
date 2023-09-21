import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';

import { ChatService } from './chat.service';

import { JwtStrategy } from '../auth/strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ChatController],
  imports: [JwtModule.register({})],
  providers: [ChatService, JwtStrategy]
})
export class ChatModule {}
