import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { Service } from './.service';

@Module({
  controllers: [ChatController],
  providers: [Service]
})
export class ChatModule {}
