import { Module } from '@nestjs/common';
import { DirectMessageService } from './directMessage.service';
import { UserModule } from '../../user/user.module';
import { DirectMessageController } from './directMessage.controller';

@Module({
	controllers: [DirectMessageController],
	providers: [DirectMessageService],
	imports: [UserModule],
})
export class DirectMessageModule {}
