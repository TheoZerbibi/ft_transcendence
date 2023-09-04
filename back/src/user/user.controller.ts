import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}
	// @UseGuards(JwtGuard)
	@Get('me')
	getMe(@GetUser() user: User) {
		return user;
	}

	// @UseGuards(JwtGuard)
	@Get(':id')
	getUserById(@Param('id') userId: string) {
		return this.userService.getUserById(parseInt(userId));
	}
}
