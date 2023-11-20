/* import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
	controllers: [AuthController],
	imports: [JwtModule.register({})],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
 */
// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AppController } from 'src/app.controller';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: process.env.JWT_SECRET, // Replace with your JWT_SECRET
			signOptions: { expiresIn: '1h' }, // Adjust token expiration as needed
		}),
	],
	controllers: [AppController],
	providers: [AuthService, JwtStrategy],
	exports: [PassportModule, JwtModule],
})
export class AuthModule {}
