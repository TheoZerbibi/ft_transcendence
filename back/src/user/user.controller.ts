import {
	BadRequestException,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Param,
	UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	// @UseGuards(JwtGuard)
	@Get(':login')
	@UseInterceptors(ClassSerializerInterceptor)
	async getUserByLogin(@Param('login') userLogin: string): Promise<UserDto | string> {
		const user = await this.userService.getUserByLogin(userLogin);
		if (!user) throw new BadRequestException('Invalid user');
		return user;
	}
}
