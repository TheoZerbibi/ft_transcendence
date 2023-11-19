import { Module } from '@nestjs/common';
import { DirectMessageService } from './direct-message.service';
import { UserModule } from '../../user/user.module';
import { DirectMessageController } from './direct-message.controller';

@Module({
	controllers: [DirectMessageController],
	providers: [DirectMessageService],
	imports: [UserModule],
})
export class DirectMessageModule {}
