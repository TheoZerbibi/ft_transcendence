import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
	imports: [JwtModule.register({})],
	exports: [AuthService, JwtModule],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
