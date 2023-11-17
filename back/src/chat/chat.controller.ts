// COMMON
import { UseGuards, Controller, Body, Param, Get, Patch, Post } from '@nestjs/common';
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
import { ChannelDto, ChannelListElemDto, CreateChannelDto, ChannelSettingsDto, ChannelModPwdDto } from './dto/channel.dto';
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

	/***********************************************************************************/
	/* 										Getters									   */
	/***********************************************************************************/

	/*********************************** Channels Lists ********************************/

	// Get all public channels
	@Get('discover')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all public channels' })
	@ApiBearerAuth('JWT-auth')
	async getAllPublicChannels(): Promise<ChannelListElemDto[]> {
		return await this.channelService.getAllPublicChannels();
	}

	//Get all channels on which user is
	@Get('joined')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get joined channels' })
	@ApiBearerAuth('JWT-auth')
	async getJoinedChannels(@GetUser() user: User): Promise<ChannelListElemDto[] | null> {
		return await this.channelService.getJoinedChannels(user);
	}

	/********************************** Channel Access *********************************/

	// Will show the public infos of the channel and possibility to join it BUT not if you are banned / is private
	@Get(':name')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get a channel by its name' })
	@ApiBearerAuth('JWT-auth')
	async getChannelByNameIfAllowed(
		@GetUser() user: User,
		@Param('name') channel_name: string,
	): Promise<ChannelEntity> {
		return await this.channelService.getChannelByNameIfAllowed(user, channel_name);
	}

	/*************************************** Users ************************************/

	//Get all users in a channel
	@Get(':channel/users')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all channel users' })
	@ApiBearerAuth('JWT-auth')
	async getAllChannelUsersByChannelName(
		@GetUser() user: User,
		@Param(':channel') channel_name: string,
	): Promise<ChannelUserEntity[] | null> {
		return await this.channelService.getAllChannelUsersByChannelName(user, channel_name);
	}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	@Post('create')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Create channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async create(@GetUser() user: User, @Body() dto: CreateChannelDto): Promise<ChannelEntity> {
		return await this.channelService.create(dto, user.id);
	}

	@Patch(':channel/join')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Add user to channel' })
	@ApiBearerAuth('JWT-auth')
	async joinChannel(@GetUser() user: User, @Param(':channel') channel_name: string): Promise<void> {
		return await this.channelService.joinChannel(user, channel_name);
	}

	//@Post(':channel/message')

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/

	@Patch('settings/:channel_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Mod channel name & privacy' })
	@ApiBearerAuth('JWT-auth')
	async modChannel(
		@GetUser() user: User,
		@Param('channel_id') channel_id_string: string,
		@Body() newParamsdto: ChannelSettingsDto,
		@Body() pwd: string,
	): Promise<void> {
		const channel_id: number = parseInt(channel_id_string, 10);
		return await this.channelService.modChannel(user, channel_id, pwd, newParamsdto);
	}

	@Patch('settings/:channel_id/pwd')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Mod channel pwd' })
	@ApiBearerAuth('JWT-auth')
	async modChannelPwd(
		@GetUser() user: User,
		@Param('channel_id') channel_id_string: string,
		@Body() ChannelModPwdDto: ChannelModPwdDto,
	): Promise<void> {
		const channel_id: number = parseInt(channel_id_string, 10);
		return await this.channelService.modChannelPwd(user, channel_id, ChannelModPwdDto);
	}


	/***********************************************************************************/
	/* 										DEBUG									   */
	/***********************************************************************************/
	// DEBUG ONLY
	@Get('allChannelsDebug')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'For debugging purpose only : Get all channels' })
	@ApiBearerAuth('JWT-auth')
	async getAllChannels(): Promise<ChannelEntity[]> {
		return await this.channelService.getAllChannels();
	}

	// DEBUG ONLY
	@Get('allChannelUsersDebug')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'For debugging purpose only : Get all channel users' })
	@ApiBearerAuth('JWT-auth')
	async getAllChannelUsers(): Promise<ChannelUserEntity[]> {
		return await this.channelService.getAllChannelUsers();
	}

}
