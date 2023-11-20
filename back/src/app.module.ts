import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
//import { ChatModule } from './chat/chat.module';
<<<<<<< HEAD
import { ChannelModule } from './chat/channels/channels.module';
=======
import { ChannelModule } from './channel/channel.module';
>>>>>>> c80165e (fix: github issue)
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
		//ChatModule,
		ChannelModule,
		GameModule,
	],
})
export class AppModule {}
