// COMMON
import { UseGuards, Controller, Body, Param, Get, Post } from '@nestjs/common';
// AUTH
import { JwtGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
// ENTITIES
import { ChannelEntity } from './impl/ChannelEntity';
import { ChannelUserEntity } from './impl/ChannelUserEntity';
import { ChannelMessageEntity } from './impl/ChannelMessageEntity';
// PRISMA
import { Channel, User, ChannelUser, ChannelMessage } from '@prisma/client';
// DTO
import { ChannelDto, ChannelNameDto, CreateChannelDto } from './dto/channel.dto';
// SERVICES
import { ChannelService } from './chat.service';
import { UserService } from '../user/user.service';

@Controller('channel')
@ApiTags('Channel')
@ApiBearerAuth()
export class ChannelController {
	constructor(
		private channelService: ChannelService,
		private userService: UserService,
	) {}

	/***********************************************/
	/* 					Creation				   */
	/***********************************************/
	@Post('create')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Create channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async create(@GetUser() user: User, @Body() dto: CreateChannelDto): Promise<ChannelEntity> {
		return await this.channelService.create(dto, user.id);
	}

	/***********************************************/
	/* 					Message					   */
	/***********************************************/

	/*
	@Post('msg')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Post message' })
	@ApiBearerAuth('JWT-auth')
	async message(@GetUser() user: User, @Body() dto: MessageDto) {
		return await this.channelService.postMessage(user, dto.channel_id, dto.content);
	}
	*/

	/***********************************************/
	/* 					Getters					   */
	/***********************************************/

	// DEBUG ONLY
	@Get('allDebug')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'For debugging purpose only : Get all channels' })
	@ApiBearerAuth('JWT-auth')
	async getAllChannels(): Promise<ChannelEntity[]> {
		return await this.channelService.getAllChannels();
	}

	/*
	// Get all public channels
	@Get('discover')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all public channels' })
	@ApiBearerAuth('JWT-auth')
	async getAllPublicChannels(): Promise<ChannelDto[]> {
		return await this.channelService.getAllPublicChannels();
	}

	//Get all channels on which user is
	@Get('all')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: "Get all user's channels" })
	@ApiBearerAuth('JWT-auth')
	async getJoinedChannels(@GetUser() user: User): Promise<ChannelDto[] | null> {
		return await this.channelService.getJoinedChannels(user);
	}

	// Will show the public infos of the channel and possibility to join it BUT not if you are banned / is private
	@Get(':name')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get a channel by its name' })
	@ApiBearerAuth('JWT-auth')
	async getChannelByNameIfAllowed(@GetUser() user: User, @Param('name') channel_name: string) {
		return await this.channelService.getChannelByNameIfAllowed(user, channel_name);
	}

	// Will show the public infos of the channel and possibility to join it BUT not if you are banned / is private
	@Get(':id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get a channel by its id' })
	@ApiBearerAuth('JWT-auth')
	async getChannelByIdIfAllowed(@GetUser() user: User, @Param('id') channel_id: number) {
		return await this.channelService.getChannelByIdIfAllowed(user, channel_id);
	}

	//Get all users in a channel
	@Get(':channel/users')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all channel users' })
	@ApiBearerAuth('JWT-auth')
	async getChannelUsers(
		@GetUser() user: User,
		@Param('channel') channel_name: string,
	): Promise<ChannelUser[] | null> {
		return await this.channelService.getChannelUsers(user, channel_name);
	}
	*/

	/****************** Users **********************/
	/*

	@Patch('mod/channel')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'mod Channel' })
	@ApiBearerAuth('JWT-auth')
	async modChannel(@Body() dto: UpdateChannelDto, @GetUser() user: User) {
		return await this.channelService.modChannel(dto, user);
	}

	// TODO
	@Patch('mod/user')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all accessible channel' })
	@ApiBearerAuth('JWT-auth')
	updateUser(@Body() dto: UpdateChannelUserDto, @GetUser() user: User): Promise<boolean> {
		return null;
	}

	@Get('public')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all public channel' })
	@ApiBearerAuth('JWT-auth')
	async public() {
		return null;
	}

	// Get all channel where there is a channel User attached to it
	@Get('subscribed')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all channel i subscribed to' })
	@ApiBearerAuth('JWT-auth')
	async subscribed(@GetUser() user: User): Promise<ChannelUser> {
		return null;
	}

	@Post('join')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Join a channel' })
	@ApiBearerAuth('JWT-auth')
	async join(@GetUser() user: User, @Body() dto: ChannelDto): Promise<ChannelUser | null> {
		return null;
	}

	//Get all msg in a channel: if you are banned you can't access it
	@Get('msg')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all accessible channel user' })
	@ApiBearerAuth('JWT-auth')
	async getChannelMsg(@GetUser() user: User, @Body() channel: ChannelDto): Promise<ChannelMessage[] | null> {
		return null;
	}

	@Delete('delete')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Delete Channel' })
	@ApiBearerAuth('JWT-auth')
	async delete(@GetUser() user: User, @Body() channel: ChannelDto): Promise<boolean> {
		return false;
	}

	//Delete channel User of user.id and channel_id:id
	@Delete('leave')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all accessible channel user' })
	@ApiBearerAuth('JWT-auth')
	async leave(@GetUser() user: User, @Body() channel: ChannelDto): Promise<boolean> {
		return false;
	}
	*/
}
