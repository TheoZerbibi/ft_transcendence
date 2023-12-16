import { Module } from '@nestjs/common';
import { ChannelService } from './channels.service.js';
import { UserModule } from '../../user/user.module';
import { ChannelController } from './channels.controller';
import { RedisService } from 'src/redis/redis.service';


@Module({
	controllers: [ChannelController],
	providers: [ChannelService, RedisService],
	imports: [UserModule],
})
export class ChannelModule {}
