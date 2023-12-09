import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { FortyTwoStrategy, JwtStrategy } from './strategy';
import { TwoFactorAuthenticationController } from './controllers/twofactor.controller';
import { TwoFactorAuthenticationService } from './services/twofactor.service';
import { UserService } from 'src/user/user.service';

@Module({
	imports: [JwtModule.register({})],
	controllers: [AuthController, TwoFactorAuthenticationController],
	providers: [FortyTwoStrategy, AuthService, UserService, JwtStrategy, TwoFactorAuthenticationService],
	exports: [],
})
export class AuthModule {}
