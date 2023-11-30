import { Module } from '@nestjs/common';
import { DirectMessageService } from './direct-message.service';
import { UserModule } from '../../user/user.module';
import { DirectMessageController } from './direct-message.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
	controllers: [DirectMessageController],
	providers: [DirectMessageService, UserService],
	imports: [JwtModule.register({}), UserModule],
})
export class DirectMessageModule {}
