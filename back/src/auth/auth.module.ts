import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FortyTwoStrategy, JwtStrategy } from './strategy';

@Module({
	imports: [JwtModule.register({})],
	controllers: [AuthController],
	providers: [FortyTwoStrategy, AuthService, JwtStrategy],
	exports: [],
})
export class AuthModule {}
