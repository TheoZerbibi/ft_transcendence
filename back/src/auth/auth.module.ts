import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FortyTwoStrategy, JwtStrategy } from './strategy';
import { UserService } from 'src/user/user.service';

@Module({
	imports: [JwtModule.register({})],
	controllers: [AuthController],
	providers: [FortyTwoStrategy, AuthService, UserService, JwtStrategy],
	exports: [],
})
export class AuthModule {}
