import { Module } from '@nestjs/common';
import { ChannelService } from './chat.service';
import { UserModule } from '../user/user.module';
import { ChannelController } from './chat.controller';

@Module({
	controllers: [ChannelController],
	providers: [ChannelService],
	imports: [UserModule],
})
export class ChannelModule {}
