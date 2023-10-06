import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
//import { ChatModule } from './chat/chat.module';
import { ChannelModule } from './channel/channel.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AuthModule,
		UserModule,
		PrismaModule,
		AuthModule,
		//ChatModule,
		ChannelModule,
	],
})
export class AppModule {}
