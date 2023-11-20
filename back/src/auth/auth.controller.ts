import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { CallbackDto } from './dto/callback.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Create a new user.' })
	async signup(@Body() dto: AuthDto) {
		return this.authService.signup(dto);
	}

	@Post('signin')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Log as user.' })
	async signin(@Body() dto: AuthDto) {
		return this.authService.signin(dto);
	}

	@Post('callback')
	@HttpCode(HttpStatus.FOUND)
	@ApiOperation({ summary: 'Callback from 42 API.' })
	async callback(@Body() dto: CallbackDto) {
		return this.authService.callback(dto);
	}
}
