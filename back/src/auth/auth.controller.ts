import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	async signup(@Body() dto: AuthDto) {
		console.log({
			dto,
		});
		return this.authService.signup(dto);
	}

	@Post('signin')
	@HttpCode(HttpStatus.OK)
	async signin(@Body() dto: AuthDto) {
		return this.authService.signin(dto);
	}
}
