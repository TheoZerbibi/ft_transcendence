import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
	providers: [AuthService],
	imports: [JwtModule.register({})],
	exports: [AuthService],
})
export class AuthModule {}
