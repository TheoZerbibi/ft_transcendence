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
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { EditUserDto, UserDto, UserLoginDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { FriendRequestDto, FriendRequestResponseDto } from './dto/friend.dto';
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
	async getUsers() {
		return await this.userService.getUsers();
	}

	// Get users not friends and not blocked
	@UseGuards(JwtGuard)
	@Get('discover')
	@ApiOperation({ summary: 'Get users list not friends and not blocked' })
	@ApiBearerAuth('JWT-auth')
	async getDiscoverUsers(@GetUser() user: User) {
		return await this.userService.getNotFriendsOfUser(user);
	}

	// Get users starting with
	@UseGuards(JwtGuard)
	@Get('search/:start')
	@ApiOperation({ summary: 'Get users list starting with' })
	@ApiBearerAuth('JWT-auth')
	async getUsersStartingWith(@Param('start') start: string) {
		return await this.userService.getUsersStartingWith(start);
	}

	// Get personal informations
	@UseGuards(JwtGuard)
	@Get('profile/me')
	@ApiOperation({ summary: 'Get personal profile' })
	@ApiBearerAuth('JWT-auth')
	getMe(@GetUser() user: User) {
		return user;
	}

	// Get other user informations
	@UseGuards(JwtGuard)
	@Get('profile/:login')
	@ApiOperation({ summary: "Get other user's profile" })
	@ApiBearerAuth('JWT-auth')
	@UseInterceptors(ClassSerializerInterceptor)
	async getUserByLogin(@Param('login') userLogin: string) {
		const user: UserDto | any = await this.userService.getUserByLogin(userLogin);
		if (!user) throw new BadRequestException('Invalid user');
		return user;
	}

	// Check if displayName is available
	@Post('getDisplayName')
	@ApiOperation({ summary: 'Check if displayName is available' })
	async getDisplayName(@Body() body: Record<string, any>) {
		const login = body.login;
		const displayName = body.displayName;

		if (!displayName || !login) {
			throw new BadRequestException('Invalid request');
		}
		return { message: await this.userService.getDisplayName(displayName, login) };
	}

	/************************************* Friends *************************************/
	// Get friends list
	@UseGuards(JwtGuard)
	@Get('friends')
	@ApiOperation({ summary: 'Get friends list' })
	@ApiBearerAuth('JWT-auth')
	async getFriends(@GetUser() user: User) {
		return await this.userService.getFriendsOfUser(user);
	}

	// Know if a user is friend
	@UseGuards(JwtGuard)
	@Get('friends/isfriend/:login')
	@ApiOperation({ summary: 'Know if a user is friend' })
	@ApiBearerAuth('JWT-auth')
	async isFriend(@GetUser() user: User, @Param('login') login: string) {
		if (await this.userService.getIsFriendOfUser(user, login)) return { isFriend: true as boolean };
		else return { isFriend: false as boolean };
	}

	// get friend requests list
	@UseGuards(JwtGuard)
	@Get('friends/requests')
	@ApiOperation({ summary: 'Get friend requests sent to user' })
	@ApiBearerAuth('JWT-auth')
	async getFriendRequests(@GetUser() user: User) {
		return await this.userService.getFriendRequestsOfUser(user);
	}

	// Get blocked list
	@UseGuards(JwtGuard)
	@Get('blocked')
	@ApiOperation({ summary: 'Get blocked users list' })
	@ApiBearerAuth('JWT-auth')
	async getBlockedUsers(@GetUser() user: User) {
		return await this.userService.getBlockedUsers(user);
	}

	/************************************ Cloudinary **********************************/
	@Post('getCloudinaryLinkOnboarding')
	@ApiOperation({ summary: 'Get Avatar Link from Cloudinary API' })
	@UseInterceptors(FileInterceptor('file', multerOptions))
	async getLinkOnboard(@UploadedFile() file: Express.Multer.File, @Body('login') login: string) {
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
	async getLink(@UploadedFile() file: Express.Multer.File, @GetUser('login') login: string) {
		if (!file) throw new BadRequestException('No file provided');
		return await this.userService.getCloudinaryLink(login, file);
	}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	/*************************************** Users *************************************/
	@Post()
	@ApiOperation({ summary: 'Create a user' })
	create(@Body() dto: CreateUserDto) {
		return this.userService.createUser(dto);
	}

	/************************************* Friends *************************************/
	// Create friends (pending)
	@UseGuards(JwtGuard)
	@Post('friends/send-request')
	@ApiOperation({ summary: 'Send request to a user' })
	@ApiBearerAuth('JWT-auth')
	async makeFriendRequest(@GetUser() user: User, @Body() dto: UserLoginDto) {
		await this.userService.makeFriendRequest(user, dto.login);
		return { message: `Friend request sent to ${dto.login}` };
	}

	/*********************************** Blocked *************************************/
	// Create blocked
	@UseGuards(JwtGuard)
	@Post('block')
	@ApiOperation({ summary: 'Block a user' })
	@ApiBearerAuth('JWT-auth')
	async blockUser(@GetUser() user: User, @Body() dto: UserLoginDto) {
		await this.userService.blockUser(user, dto.login);
		return { message: `User ${dto.login} blocked` };
	}

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/

	/*************************************** Users *************************************/

	@UseGuards(JwtGuard)
	@Patch()
	@ApiOperation({ summary: 'Change display_name or Avatar for the user' })
	@ApiBearerAuth('JWT-auth')
	async editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
		await this.userService.editUser(userId, dto);
		return { message: 'User updated' };
	}

	/************************************* Friends *************************************/
	@UseGuards(JwtGuard)
	@Patch('friends/respond-request')
	@ApiOperation({ summary: 'Respond to friend request' })
	@ApiBearerAuth('JWT-auth')
	async respondFriendRequest(@GetUser() user: User, @Body() dto: FriendRequestResponseDto) {
		await this.userService.respondRequest(user, dto.login, dto.response);
		return { message: 'Request ' + dto.response ? 'accepted' : 'declined' };
	}

	/***********************************************************************************/
	/* 										Deletion								   */
	/***********************************************************************************/

	/*************************************** Users *************************************/
	@UseGuards(JwtGuard)
	@Delete('profile')
	@ApiOperation({ summary: 'Delete a user' })
	@ApiBearerAuth('JWT-auth')
	async deleteUser(@GetUser() user: User) {
		await this.userService.deleteUser(user.id);
		return { message: 'User deleted' };
	}

	/************************************* Friends *************************************/
	@UseGuards(JwtGuard)
	@Delete('friends')
	@ApiOperation({ summary: 'Remove friend' })
	@ApiBearerAuth('JWT-auth')
	async removeFriend(@GetUser() user: User, @Body() dto: UserLoginDto) {
		await this.userService.removeFriend(user, dto.login);
		return { message: 'Bye bye!' };
	}

	/*********************************** Blocked *************************************/
	@UseGuards(JwtGuard)
	@Delete('blocked')
	@ApiOperation({ summary: 'Unblock a user' })
	@ApiBearerAuth('JWT-auth')
	async unblockUser(@GetUser() user: User, @Body() dto: UserLoginDto) {
		await this.userService.unblockUser(user, dto.login);
		return { message: `User ${dto.login} unblocked` };
	}
}
