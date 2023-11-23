import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { DirectMessageModule } from './chat/direct-messages/direct-message.module';
import { ChannelModule } from './chat/channels/channels.module';
import { GameModule } from './game/game.module';
import { RedisModule } from './redis/redis.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AuthModule,
		PrismaModule,
		RedisModule,
		UserModule,
		DirectMessageModule,
		ChannelModule,
		GameModule,
	],
})
export class AppModule {}
