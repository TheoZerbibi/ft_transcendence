import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChannelModule } from './chat/channels/channels.module';
import { GameModule } from './game/game.module';
import { RedisModule } from './redis/redis.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		PrismaModule,
		RedisModule,
		AuthModule,
		UserModule,
		ChannelModule,
		GameModule,
	],
})
export class AppModule {}
