/* eslint-disable indent */
import {
	BadRequestException,
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	Param,
	Patch,
	Post,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { EditUserDto, UserDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { FriendRequestDto } from './dto/friend.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { multerOptions } from './multer/multer.config';

@Controller('users')
@ApiBearerAuth()
@ApiTags('Users')
export class UserController {
	constructor(private userService: UserService) {}

	/***********************************************************************************/
	/* 										Getters									   */
	/***********************************************************************************/

	/*************************************** Users *************************************/
	// Get users list
	@UseGuards(JwtGuard)
	@Get('all')
	@ApiOperation({ summary: 'Get users list' })
	@ApiBearerAuth('JWT-auth')
	async getUsers(): Promise<UserDto[]> {
		return await this.userService.getUsers();
	}

	// Get users starting with
	@UseGuards(JwtGuard)
	@Get('search/:start')
	@ApiOperation({ summary: 'Get users list starting with' })
	@ApiBearerAuth('JWT-auth')
	async getUsersStartingWith(@Param('start') start: string): Promise<UserDto[]> {
		return await this.userService.getUsersStartingWith(start);
	}

	// Get personal informations
	@UseGuards(JwtGuard)
	@Get('profile/me')
	@ApiOperation({ summary: 'Get personal profile' })
	@ApiBearerAuth('JWT-auth')
	getMe(@GetUser() user: User): User {
		return user;
	}

	// Get other user informations
	@UseGuards(JwtGuard)
	@Get('profile/:login')
	@ApiOperation({ summary: "Get other user's profile" })
	@ApiBearerAuth('JWT-auth')
	@UseInterceptors(ClassSerializerInterceptor)
	async getUserByLogin(@Param('login') userLogin: string): Promise<UserDto> {
		const user: UserDto | undefined = await this.userService.getUserByLogin(userLogin);
		if (!user) throw new BadRequestException('Invalid user');
		return user;
	}

	@Post('getDisplayName')
	@ApiOperation({ summary: 'Check if displayName is available' })
	async getDisplayName(@Body() body: Record<string, any>): Promise<any> {
		const login = body.login;
		const displayName = body.displayName;

		if (!displayName || !login) {
			throw new BadRequestException('Invalid request');
		}

		return { response: await this.userService.getDisplayName(displayName, login) };
	}

	/************************************* Friends *************************************/
	// Get friends list
	@UseGuards(JwtGuard)
	@Get('friends')
	@ApiOperation({ summary: 'Get friends list' })
	@ApiBearerAuth('JWT-auth')
	async getFriends(@GetUser() user: User): Promise<UserDto[]> {
		return await this.userService.getFriendsOfUser(user);
	}

	// get friend requests list
	@UseGuards(JwtGuard)
	@Get('friends/requests')
	@ApiOperation({ summary: 'Get friend requests sent to user' })
	@ApiBearerAuth('JWT-auth')
	async getFriendRequests(@GetUser() user: User): Promise<FriendRequestDto[]> {
		return await this.userService.getFriendRequestsOfUser(user);
	}

	// Get blocked list
	@UseGuards(JwtGuard)
	@Get('blocked')
	@ApiOperation({ summary: 'Get blocked users list' })
	@ApiBearerAuth('JWT-auth')
	async getBlockedUsers(@GetUser() user: User): Promise<UserDto[]> {
		return await this.userService.getBlockedUsers(user);
	}

	/************************************ Cloudinary **********************************/
	@Post('getCloudinaryLinkOnboarding')
	@ApiOperation({ summary: 'Get Avatar Link from Cloudinary API' })
	@UseInterceptors(FileInterceptor('file', multerOptions))
	async getLinkOnboard(@UploadedFile() file: Express.Multer.File, @Body('login') login: string): Promise<any> {
		if (!file) throw new BadRequestException('No file provided');
		if (!login) throw new BadRequestException('No login provided');
		if (!UserService.isOnBoarding(login)) throw new ForbiddenException('User not unauthorized');
		return this.userService.getCloudinaryLink(login, file);
	}

	@UseGuards(JwtGuard)
	@Post('getCloudinaryLink')
	@ApiOperation({ summary: 'Get Avatar Link from Cloudinary API' })
	@ApiBearerAuth('JWT-auth')
	@UseInterceptors(FileInterceptor('file', multerOptions))
	async getLink(@UploadedFile() file: Express.Multer.File, @GetUser('login') login: string): Promise<any> {
		if (!file) throw new BadRequestException('No file provided');
		return this.userService.getCloudinaryLink(login, file);
	}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	/************************************* Friends *************************************/
	// Create friends (pending)
	@UseGuards(JwtGuard)
	@Post('friends/request/:target')
	@ApiOperation({ summary: 'Send request to a user' })
	@ApiBearerAuth('JWT-auth')
	async addFriend(@GetUser() user: User, @Param('target') friendUsername: string): Promise<void> {
		await this.userService.makeFriendRequest(user, friendUsername);
	}

	// Create blocked
	@UseGuards(JwtGuard)
	@Post('block/:target')
	@ApiOperation({ summary: 'Block a user' })
	@ApiBearerAuth('JWT-auth')
	async blockUser(@GetUser() user: User, @Param('target') username: string): Promise<void> {
		await this.userService.blockUser(user, username);
	}

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/

	/*************************************** Users *************************************/
	@Post()
	@ApiOperation({ summary: 'Create a user' })
	create(@Body() dto: CreateUserDto): Promise<User> {
		return this.userService.createUser(dto);
	}

	@UseGuards(JwtGuard)
	@Patch()
	@ApiOperation({ summary: 'Change display_name or Avatar for the user' })
	@ApiBearerAuth('JWT-auth')
	editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto): Promise<User> {
		return this.userService.editUser(userId, dto);
	}

	/************************************* Friends *************************************/
	@UseGuards(JwtGuard)
	@Patch('friends/requests/:target')
	@ApiOperation({ summary: 'Accept a friend request' })
	@ApiBearerAuth('JWT-auth')
	async acceptFriendRequest(@GetUser() user: User, @Param('target') username: string): Promise<void> {
		await this.userService.acceptFriendRequest(user, username);
	}

	/***********************************************************************************/
	/* 										Deletion								   */
	/***********************************************************************************/

	/*************************************** Users *************************************/
	@UseGuards(JwtGuard)
	@Delete('profile/:id')
	@ApiOperation({ summary: 'Delete a user' })
	@ApiBearerAuth('JWT-auth')
	async deleteUser(@Param('id') user_id: string): Promise<void> {
		const user_id_int = parseInt(user_id);
		await this.userService.deleteUser(user_id_int);
	}

	/************************************* Friends *************************************/
	@UseGuards(JwtGuard)
	@Delete('friends/requests/:target')
	@ApiOperation({ summary: 'Decline a friend request' })
	@ApiBearerAuth('JWT-auth')
	async declineFriendRequest(@GetUser() user: User, @Param('target') username: string): Promise<void> {
		await this.userService.declineFriendRequest(user, username);
	}

	/*********************************** Blocked *************************************/
	@UseGuards(JwtGuard)
	@Delete('blocked/:target')
	@ApiOperation({ summary: 'Unblock a user' })
	@ApiBearerAuth('JWT-auth')
	async unblockUser(@GetUser() user: User, @Param('target') username: string): Promise<void> {
		await this.userService.unblockUser(user, username);
	}
}
