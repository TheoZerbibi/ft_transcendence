/* eslint-disable indent */
import {
	BadRequestException,
	Body,
	ClassSerializerInterceptor,
	Controller,
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
import { EditUserDto, UserDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { multerOptions } from './multer/multer.config';

@Controller('users')
@ApiBearerAuth()
@ApiTags('Users')
export class UserController {
	constructor(private userService: UserService) {}

	@UseGuards(JwtGuard)
	@Get('me')
	@ApiOperation({ summary: 'Get personal information' })
	@ApiBearerAuth('JWT-auth')
	getMe(@GetUser() user: User): User {
		return user;
	}

	@UseGuards(JwtGuard)
	@Get(':login')
	@ApiOperation({ summary: 'Get specific user information' })
	@ApiBearerAuth('JWT-auth')
	@UseInterceptors(ClassSerializerInterceptor)
	async getUserByLogin(@Param('login') userLogin: string): Promise<UserDto> {
		const user: UserDto | undefined = await this.userService.getUserByLogin(userLogin);
		if (!user) throw new BadRequestException('Invalid user');
		return user;
	}

	@UseGuards(JwtGuard)
	@Post('getCloudinaryLink')
	@ApiOperation({ summary: 'Get Avatar Link from Cloudinary API' })
	@ApiBearerAuth('JWT-auth')
	@UseInterceptors(FileInterceptor('file', multerOptions))
	async getLink(@GetUser('id') userId: number, @UploadedFile() file: Express.Multer.File): Promise<any> {
		return this.userService.getCloudinaryLink(userId, file);
	}

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

	@UseGuards(JwtGuard)
	@Post(':login/friend/:friend_login')
	@ApiOperation({ summary: 'Become friend with a user (follow)' })
	@ApiBearerAuth('JWT-auth')
	async addFriend(@Param('login') username: string, @Param('friend_login') friendUsername: string): Promise<void> {
		await this.userService.addFriend(username, friendUsername);
	}
}
