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
		try {
			return await this.userService.getUsers();
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	// Get users not friends and not blocked
	@UseGuards(JwtGuard)
	@Get('discover')
	@ApiOperation({ summary: 'Get users list not friends and not blocked' })
	@ApiBearerAuth('JWT-auth')
	async getDiscoverUsers(@GetUser() user: User) {
		try {
			return await this.userService.getNotFriendsOfUser(user);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	// Get users starting with
	@UseGuards(JwtGuard)
	@Get('search/:start')
	@ApiOperation({ summary: 'Get users list starting with' })
	@ApiBearerAuth('JWT-auth')
	async getUsersStartingWith(@Param('start') start: string) {
		try {
			return await this.userService.getUsersStartingWith(start);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	// Get personal informations
	@UseGuards(JwtGuard)
	@Get('profile/me')
	@ApiOperation({ summary: 'Get personal profile' })
	@ApiBearerAuth('JWT-auth')
	getMe(@GetUser() user: User) {
		try {
			return user;
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	// Get other user informations
	@UseGuards(JwtGuard)
	@Get('profile/:login')
	@ApiOperation({ summary: "Get other user's profile" })
	@ApiBearerAuth('JWT-auth')
	@UseInterceptors(ClassSerializerInterceptor)
	async getUserByLogin(@Param('login') userLogin: string) {
		try {
			const user: UserDto | undefined = await this.userService.getUserByLogin(userLogin);
			if (!user) throw new BadRequestException('Invalid user');
			return user;
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	@Post('getDisplayName')
	@ApiOperation({ summary: 'Check if displayName is available' })
	async getDisplayName(@Body() body: Record<string, any>) {
		try {
			const login = body.login;
			const displayName = body.displayName;

			if (!displayName || !login) {
				throw new BadRequestException('Invalid request');
			}

			return { response: await this.userService.getDisplayName(displayName, login) };
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/************************************* Friends *************************************/
	// Get friends list
	@UseGuards(JwtGuard)
	@Get('friends')
	@ApiOperation({ summary: 'Get friends list' })
	@ApiBearerAuth('JWT-auth')
	async getFriends(@GetUser() user: User) {
		try {
			return await this.userService.getFriendsOfUser(user);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	// get friend requests list
	@UseGuards(JwtGuard)
	@Get('friends/requests')
	@ApiOperation({ summary: 'Get friend requests sent to user' })
	@ApiBearerAuth('JWT-auth')
	async getFriendRequests(@GetUser() user: User) {
		try {
			return await this.userService.getFriendRequestsOfUser(user);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	// Get blocked list
	@UseGuards(JwtGuard)
	@Get('blocked')
	@ApiOperation({ summary: 'Get blocked users list' })
	@ApiBearerAuth('JWT-auth')
	async getBlockedUsers(@GetUser() user: User) {
		try {
			return await this.userService.getBlockedUsers(user);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/************************************ Cloudinary **********************************/
	@Post('getCloudinaryLinkOnboarding')
	@ApiOperation({ summary: 'Get Avatar Link from Cloudinary API' })
	@UseInterceptors(FileInterceptor('file', multerOptions))
	async getLinkOnboard(@UploadedFile() file: Express.Multer.File, @Body('login') login: string) {
		try {
			if (!file) throw new BadRequestException('No file provided');
			if (!login) throw new BadRequestException('No login provided');
			if (!UserService.isOnBoarding(login)) throw new ForbiddenException('User not unauthorized');
			return this.userService.getCloudinaryLink(login, file);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
		}
	}

	@UseGuards(JwtGuard)
	@Post('getCloudinaryLink')
	@ApiOperation({ summary: 'Get Avatar Link from Cloudinary API' })
	@ApiBearerAuth('JWT-auth')
	@UseInterceptors(FileInterceptor('file', multerOptions))
	async getLink(@UploadedFile() file: Express.Multer.File, @GetUser('login') login: string) {
		try {
			if (!file) throw new BadRequestException('No file provided');
				return this.userService.getCloudinaryLink(login, file);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	/************************************* Friends *************************************/
	// Create friends (pending)
	@UseGuards(JwtGuard)
	@Post('friends/send-request')
	@ApiOperation({ summary: 'Send request to a user' })
	@ApiBearerAuth('JWT-auth')
	async makeFriendRequest(@GetUser() user: User, @Body() dto: UserLoginDto) {
		try {
			await this.userService.makeFriendRequest(user, dto.login);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	// Create blocked
	@UseGuards(JwtGuard)
	@Post('block')
	@ApiOperation({ summary: 'Block a user' })
	@ApiBearerAuth('JWT-auth')
	async blockUser(@GetUser() user: User, @Body() dto: UserLoginDto) {
		try {
			await this.userService.blockUser(user, dto.login);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/

	/*************************************** Users *************************************/
	@Post()
	@ApiOperation({ summary: 'Create a user' })
	create(@Body() dto: CreateUserDto) {
		try {
			return this.userService.createUser(dto);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	@UseGuards(JwtGuard)
	@Patch()
	@ApiOperation({ summary: 'Change display_name or Avatar for the user' })
	@ApiBearerAuth('JWT-auth')
	editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
		try {
			return this.userService.editUser(userId, dto);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/************************************* Friends *************************************/
	@UseGuards(JwtGuard)
	@Patch('friends/respond-request')
	@ApiOperation({ summary: 'Respond to friend request' })
	@ApiBearerAuth('JWT-auth')
	async respondFriendRequest(@GetUser() user: User, @Body() dto: FriendRequestResponseDto) {
		try {
			await this.userService.respondRequest(user, dto.login, dto.response);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/***********************************************************************************/
	/* 										Deletion								   */
	/***********************************************************************************/

	/*************************************** Users *************************************/
	@UseGuards(JwtGuard)
	@Delete('profile')
	@ApiOperation({ summary: 'Delete a user' })
	@ApiBearerAuth('JWT-auth')
	async deleteUser(@Param('id') user_id: string) {
		try {
			const user_id_int = parseInt(user_id);
			await this.userService.deleteUser(user_id_int);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/************************************* Friends *************************************/
	@UseGuards(JwtGuard)
	@Delete('friends')
	@ApiOperation({ summary: 'Remove friend' })
	@ApiBearerAuth('JWT-auth')
	async removeFriend(@GetUser() user: User, @Body() dto: UserLoginDto) {
		try {
			await this.userService.removeFriend(user, dto.login);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/*********************************** Blocked *************************************/
	@UseGuards(JwtGuard)
	@Delete('blocked')
	@ApiOperation({ summary: 'Unblock a user' })
	@ApiBearerAuth('JWT-auth')
	async unblockUser(@GetUser() user: User, @Body() dto: UserLoginDto) {
		try {
			await this.userService.unblockUser(user, dto.login);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}
}
