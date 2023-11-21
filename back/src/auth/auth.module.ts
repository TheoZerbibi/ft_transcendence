import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FortyTwoStrategy, JwtStrategy } from './strategy';
import { Connection } from './connection/connection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionService } from './connection/connection.service';

@Module({
	imports: [
		JwtModule.register({}),
		// TypeOrmModule.forFeature([Connection])
	],
	controllers: [AuthController],
	providers: [FortyTwoStrategy, AuthService, JwtStrategy],
	exports: [],
})
export class AuthModule {}
