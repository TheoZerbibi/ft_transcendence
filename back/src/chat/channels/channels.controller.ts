// COMMON
import { UseGuards, Controller, Body, Param, Get, Patch, Post, Delete, BadRequestException } from '@nestjs/common';
// AUTH
import { JwtGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
// ENTITIES
import { ChannelEntity } from './impl/ChannelEntity';
import { ChannelUserEntity } from './impl/ChannelUserEntity';
import { ChannelMessageEntity } from './impl/ChannelMessageEntity';
// PRISMA
import { User } from '@prisma/client';
// DTO
import { ChannelListElemDto, CreateChannelDto, ChannelSettingsDto, ChannelModPwdDto, JoinChannelDto, AdminModUserDto, PasswordRequiredActionDto } from './dto/channel.dto';
import { ChannelMessageContentDto, ChannelMessageDto } from './dto/channel-message.dto';
// SERVICES
import { ChannelService } from './channels.service';

@Controller('channel')
@ApiTags('Channel')
@ApiBearerAuth()
export class ChannelController {
	constructor(private channelService: ChannelService) {}

	/***********************************************************************************/
	/* 										Getters									   */
	/***********************************************************************************/

	/*********************************** Channels Lists ********************************/

	// Get all public channels
	@Get('list/discover')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all public channels' })
	@ApiBearerAuth('JWT-auth')
	async getAllPublicChannels(): Promise<ChannelListElemDto[]> {
		return await this.channelService.getAllPublicChannels();
	}

	//Get all channels on which user is
	@Get('list/joined')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get joined channel names' })
	@ApiBearerAuth('JWT-auth')
	async getJoinedChannelNames(@GetUser() user: User): Promise<ChannelListElemDto[] | null> {
		return await this.channelService.getJoinedChannelNames(user);
	}

	/********************************** Channel Access *********************************/

	// Get a channel by its name
	@Get('access/:name')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Access to a channel by its name' })
	@ApiBearerAuth('JWT-auth')
	async accessChannelByName(
		@GetUser() user: User,
		@Param('name') channel_name: string,
	): Promise<ChannelEntity | null> {
		return await this.channelService.accessChannelByName(user, channel_name);
	}

	/*************************************** Users ************************************/

	//Get all users in a channel
	@Get('access/:channel_name/users')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all channel users' })
	@ApiBearerAuth('JWT-auth')
	async getAllChannelUsers(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
	): Promise<ChannelUserEntity[] | null> {
		return await this.channelService.getAllChannelUsers(user, channel_name);
	}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	@Post('create')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Create channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async createChannel(@GetUser() user: User, @Body() dto: CreateChannelDto): Promise<ChannelEntity> {
		return await this.channelService.createChannel(dto, user.id);
	}

	@Post('join/:channel')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Add user to channel' })
	@ApiBearerAuth('JWT-auth')
	async joinChannel(
		@GetUser() user: User,
		@Param(':channel') channel_name: string,
		@Body() dto: JoinChannelDto,
	): Promise<void> {
		return await this.channelService.joinChannel(user, channel_name, dto);
	}

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/

	/*********************************** Channel Settings ******************************/

	@Patch('settings/:channel_name/general')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Mod channel name & privacy' })
	@ApiBearerAuth('JWT-auth')
	async modChannel(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
		@Body() newParamsdto: ChannelSettingsDto,
	): Promise<void> {
		return await this.channelService.modChannel(user, channel_name, newParamsdto);
	}

	@Patch('settings/:channel_name/pwd')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Mod channel pwd' })
	@ApiBearerAuth('JWT-auth')
	async modChannelPwd(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
		@Body() channelModPwdDto: ChannelModPwdDto,
	): Promise<void> {
		return await this.channelService.modChannelPwd(user, channel_name, channelModPwdDto);
	}

	/*************************************** Users ************************************/

	@Patch('settings/:channel_name/admin')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Set user as admin of channel' })
	@ApiBearerAuth('JWT-auth')
	async setAdmin(
		@GetUser() user: User,
		@Param('channel') channel_name: string,
		@Body() dto: AdminModUserDto,
	): Promise<void> {
		return await this.channelService.setChannelUserAsAdmin(user, channel_name, dto);
	}

	@Patch('settings/:channel_name/mute')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Mute user from channel' })
	@ApiBearerAuth('JWT-auth')
	async muteUser(
		@GetUser() user: User,
		@Param('channel') channel_name: string,
		@Body() dto: AdminModUserDto,
	): Promise<void> {
		return await this.channelService.muteChannelUser(user, channel_name, dto);
	}

	@Patch('settings/:channel_name/unmute')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Unmute user from channel' })
	@ApiBearerAuth('JWT-auth')
	async unmuteUser(
		@GetUser() user: User,
		@Param('channel') channel_name: string,
		@Body() dto: AdminModUserDto,
	): Promise<void> {
		return await this.channelService.unmuteChannelUser(user, channel_name, dto);
	}

	@Patch('settings/:channel_name/kick')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Kick user from channel' })
	@ApiBearerAuth('JWT-auth')
	async kickUser(
		@GetUser() user: User,
		@Param('channel') channel_name: string,
		@Body() dto: AdminModUserDto,
	): Promise<void> {
		return await this.channelService.kickChannelUser(user, channel_name, dto);
	}

	@Patch('settings/:channel_name/ban')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Ban user from channel' })
	@ApiBearerAuth('JWT-auth')
	async banUser(
		@GetUser() user: User,
		@Param('channel') channel_name: string,
		@Body() dto: AdminModUserDto,
	): Promise<void> {
		return await this.channelService.banChannelUser(user, channel_name, dto);
	}

	@Patch('settings/:channel_name/unban')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Unban user from channel (kick them)' })
	@ApiBearerAuth('JWT-auth')
	async unbanUser(
		@GetUser() user: User,
		@Param('channel') channel_name: string,
		@Body() dto: AdminModUserDto,
	): Promise<void> {
		return await this.channelService.unbanChannelUser(user, channel_name, dto);
	}

	/***********************************************************************************/
	/* 									Deletion									   */
	/***********************************************************************************/

	@Delete(':channel_name/leave')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Leave channel' })
	@ApiBearerAuth('JWT-auth')
	async leaveChannel(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
	): Promise<void> {
		return await this.channelService.leaveChannel(user, channel_name);
	}

	@Delete(':channel_name')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Delete channel' })
	@ApiBearerAuth('JWT-auth')
	async deleteChannel(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
		@Body() dto: PasswordRequiredActionDto,
	): Promise<void> {
		return await this.channelService.deleteChannel(user, channel_name, dto);
	}

	/***********************************************************************************/
	/* 										Messages								   */
	/***********************************************************************************/

	@Post('messages/:channel_name/message')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Send message to channel' })
	@ApiBearerAuth('JWT-auth')
	async sendMessage( @GetUser() user: User, @Param('channel_name') channel_name: string, @Body() ChannelMessageContentDto: ChannelMessageContentDto,
	): Promise<ChannelMessageDto> {
		return await this.channelService.sendMessage(user, channel_name, ChannelMessageContentDto);
	}

	@Get('messages/:channel_name')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get 20 last messages from channel' })
	@ApiBearerAuth('JWT-auth')
	async getLastMessages(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
	): Promise<ChannelMessageEntity[]> {
		return await this.channelService.getLastMessages(user, channel_name);
	}

	@Delete('messages/:channel_name/:message_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Delete message from channel' })
	@ApiBearerAuth('JWT-auth')
	async deleteMessage(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
		@Param('message_id') message_id_string: string,
	): Promise<void> {
		const message_id: number = parseInt(message_id_string, 10);
		return await this.channelService.deleteMessage(user, channel_name, message_id);
	}

	/***********************************************************************************/
	/* 										DEBUG									   */
	/***********************************************************************************/
	// DEBUG ONLY
	@Get('list/allChannelsDebug')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'For debugging purpose only : Get all channels' })
	@ApiBearerAuth('JWT-auth')
	//async getAllChannelsDebug(): Promise<ChannelEntity[]> {
	async getAllChannelsDebug(): Promise<ChannelListElemDto[]> {
		//return await this.channelService.getAllChannelsDebug();
		return await this.channelService.getAllPublicChannels();
	}

	// DEBUG ONLY
	@Get('list/allChannelUsersDebug')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'For debugging purpose only : Get all channel users' })
	@ApiBearerAuth('JWT-auth')
	async getAllChannelUsersDebug(): Promise<ChannelUserEntity[]> {
		return await this.channelService.getAllChannelUsersDebug();
	}

}
