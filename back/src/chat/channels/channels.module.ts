import { Module } from '@nestjs/common';
import { ChannelService } from './channels.service';
import { UserModule } from '../../user/user.module';
import { ChannelController } from './channels.controller';

@Module({
	controllers: [ChannelController],
	providers: [ChannelService],
	imports: [UserModule],
})
export class ChannelModule {}
