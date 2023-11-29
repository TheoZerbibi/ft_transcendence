import { Module } from '@nestjs/common';
import { DirectMessageService } from './direct-message.service';
import { UserModule } from '../../user/user.module';
import { DirectMessageController } from './direct-message.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
	controllers: [DirectMessageController],
	providers: [DirectMessageService, UserService],
	imports: [JwtModule.register({}), UserModule],
})
export class DirectMessageModule {}
