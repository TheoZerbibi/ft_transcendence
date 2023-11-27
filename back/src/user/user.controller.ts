import {
	BadRequestException,
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { EditUserDto, UserDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('users')
@ApiBearerAuth()
@ApiTags('Users')
export class UserController {
	constructor(private userService: UserService) {}

	/***********************************************************************************/
	/* 										Getters									   */
	/***********************************************************************************/

	/*************************************** Users *************************************/
	// Get personal informations
	@UseGuards(JwtGuard)
	@Get('me')
	@ApiOperation({ summary: 'Get personal profile' })
	@ApiBearerAuth('JWT-auth')
	getMe(@GetUser() user: User): User {
		return user;
	}

	// Get other user informations
	@UseGuards(JwtGuard)
	@Get(':login')
	@ApiOperation({ summary: "Get other user's profile" })
	@ApiBearerAuth('JWT-auth')
	@UseInterceptors(ClassSerializerInterceptor)
	async getUserByLogin(@Param('login') userLogin: string): Promise<UserDto> {
		const user: UserDto | undefined = await this.userService.getUserByLogin(userLogin);
		if (!user) throw new BadRequestException('Invalid user');
		return user;
	}

	/************************************* Friends *************************************/

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/
	// Create friends (pending)
	@UseGuards(JwtGuard)
	@Post('request/:target')
	@ApiOperation({ summary: 'Send request to a user' })
	@ApiBearerAuth('JWT-auth')
	async addFriend(@GetUser() user: User, @Param('target') friendUsername: string): Promise<void> {
		await this.userService.makeFriendRequest(user, friendUsername);
	}

	// Create blocked
	@UseGuards(JwtGuard)
	@Post('block/:target')
	@ApiOperation({ summary: 'Block a user' })
	async blockUser(@GetUser() user: User, @Param('target') username: string): Promise<void> {
		await this.userService.blockUser(user, username);
	}

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/
	@UseGuards(JwtGuard)
	@Patch('me')
	@ApiOperation({ summary: 'Change display_name or Avatar for the user' })
	@ApiBearerAuth('JWT-auth')
	editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto): Promise<User> {
		return this.userService.editUser(userId, dto);
	}
}
