import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
