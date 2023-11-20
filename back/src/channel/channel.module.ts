import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { UserModule } from '../user/user.module';
import { ChannelController } from './channel.controller';

@Module({
	controllers: [ChannelController],
	providers: [ChannelService],
	imports: [UserModule],
})
export class ChannelModule {}
