// COMMON
import { UseGuards, Controller, Body, Param, Get, Patch, Post, Delete } from '@nestjs/common';
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
import { ChannelListElemDto, CreateChannelDto, ChannelSettingsDto, ChannelModPwdDto } from './dto/channel.dto';
import { ChannelMessageDto } from './dto/channel-message.dto';
// SERVICES
import { ChannelService } from './channels.service';
import { UserService } from '../../user/user.service';

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
	@ApiOperation({ summary: 'Get joined channel names' })
	@ApiBearerAuth('JWT-auth')
	async getJoinedChannelNames(@GetUser() user: User): Promise<ChannelListElemDto[] | null> {
		return await this.channelService.getJoinedChannelNames(user);
	}

	/********************************** Channel Access *********************************/

	// Get a channel by its name
	@Get(':name')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Access to a channel by its name' })
	@ApiBearerAuth('JWT-auth')
	async accessChannelByName(
		@GetUser() user: User,
		@Param('name') channel_name: string,
		@Body() pwd: string,
	): Promise<ChannelEntity> {
		return await this.channelService.accessChannelByName(user, channel_name, pwd);
	}

	/*************************************** Users ************************************/

	//Get all users in a channel
	@Get(':channel_id/users')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all channel users' })
	@ApiBearerAuth('JWT-auth')
	async getAllChannelUsers(
		@GetUser() user: User,
		@Param('channel_id') channel_id_string: string,
		@Body() pwd: string,
	): Promise<ChannelUserEntity[] | null> {
		const channel_id: number = parseInt(channel_id_string, 10);
		return await this.channelService.getAllChannelUsers(user, channel_id, pwd);
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

	@Post(':channel/join')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Add user to channel' })
	@ApiBearerAuth('JWT-auth')
	async joinChannel(
		@GetUser() user: User,
		@Param(':channel') channel_name: string,
		@Body() pwd: string,
	): Promise<void> {
		return await this.channelService.joinChannel(user, channel_name, pwd);
	}

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/

	/*********************************** Channel Settings ******************************/

	@Patch('settings/:channel_id/name_or_privacy')
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

	/*************************************** Users ************************************/

	@Patch('settings/:channel_id/admin/:user_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Set user as admin of channel' })
	@ApiBearerAuth('JWT-auth')
	async setAdmin(
		@GetUser() user: User,
		@Param('channel') channel_id_string: string,
		@Param('id') target_user_id_str: string,
		@Body() pwd: string,
	): Promise<void> {
		const channel_id: number = parseInt(channel_id_string, 10);
		const target_user_id: number = parseInt(target_user_id_str, 10);
		return await this.channelService.setChannelUserAsAdmin(user, channel_id, target_user_id, pwd);
	}

	@Patch('settings/:channel_id/mute/:user_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Mute user from channel' })
	@ApiBearerAuth('JWT-auth')
	async muteUser(
		@GetUser() user: User,
		@Param('channel') channel_id_string: string,
		@Param('id') target_user_id_str: string,
		@Body() pwd: string,
	): Promise<void> {
		const channel_id: number = parseInt(channel_id_string, 10);
		const target_user_id: number = parseInt(target_user_id_str, 10);
		return await this.channelService.muteChannelUser(user, channel_id, target_user_id, pwd);
	}

	@Patch('settings/:channel_id/unmute/:user_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Unmute user from channel' })
	@ApiBearerAuth('JWT-auth')
	async unmuteUser(
		@GetUser() user: User,
		@Param('channel') channel_id_string: string,
		@Param('id') target_user_id_str: string,
		@Body() pwd: string,
	): Promise<void> {
		const channel_id: number = parseInt(channel_id_string, 10);
		const target_user_id: number = parseInt(target_user_id_str, 10);
		return await this.channelService.unmuteChannelUser(user, channel_id, target_user_id, pwd);
	}

	@Patch('settings/:channel_id/kick/:user_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Kick user from channel' })
	@ApiBearerAuth('JWT-auth')
	async kickUser(
		@GetUser() user: User,
		@Param('channel') channel_id_string: string,
		@Param('id') target_user_id_str: string,
		@Body() pwd: string,
	): Promise<void> {
		const channel_id: number = parseInt(channel_id_string, 10);
		const target_user_id: number = parseInt(target_user_id_str, 10);
		return await this.channelService.kickChannelUser(user, channel_id, target_user_id, pwd);
	}

	@Patch('settings/:channel_id/ban/:user_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Ban user from channel' })
	@ApiBearerAuth('JWT-auth')
	async banUser(
		@GetUser() user: User,
		@Param('channel') channel_id_string: string,
		@Param('id') target_user_id_str: string,
		@Body() pwd: string,
	): Promise<void> {
		const channel_id: number = parseInt(channel_id_string, 10);
		const target_user_id: number = parseInt(target_user_id_str, 10);
		return await this.channelService.banChannelUser(user, channel_id, target_user_id, pwd);
	}

	@Patch('settings/:channel_id/unban/:user_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Unban user from channel (kick them)' })
	@ApiBearerAuth('JWT-auth')
	async unbanUser(
		@GetUser() user: User,
		@Param('channel') channel_id_string: string,
		@Param('id') target_user_id_str: string,
		@Body() pwd: string,
	): Promise<void> {
		const channel_id: number = parseInt(channel_id_string, 10);
		const target_user_id: number = parseInt(target_user_id_str, 10);
		return await this.channelService.unbanChannelUser(user, channel_id, target_user_id, pwd);
	}

	/***********************************************************************************/
	/* 										Messages								   */
	/***********************************************************************************/

	@Post(':channel_id/message')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Send message to channel' })
	@ApiBearerAuth('JWT-auth')
	async sendMessage(
		@GetUser() user: User,
		@Param('channel_id') channel_id_string: string,
		@Body() channelMessageDto: ChannelMessageDto,
	): Promise<ChannelMessageEntity> {
		const channel_id: number = parseInt(channel_id_string, 10);
		return await this.channelService.sendMessage(user, channel_id, channelMessageDto);
	}

	@Get(':channel_id/messages')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get 20 last messages from channel' })
	@ApiBearerAuth('JWT-auth')
	async getLastMessages(
		@GetUser() user: User,
		@Param('channel_id') channel_id_string: string,
		@Body() pwd: string,
	): Promise<ChannelMessageEntity[]> {
		const channel_id: number = parseInt(channel_id_string, 10);
		return await this.channelService.getLastMessages(user, channel_id, pwd);
	}

	@Delete(':channel_id/:message_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Delete message from channel' })
	@ApiBearerAuth('JWT-auth')
	async deleteMessage(
		@GetUser() user: User,
		@Param('channel_id') channel_id_string: string,
		@Param('message_id') message_id_string: string,
	): Promise<void> {
		const channel_id: number = parseInt(channel_id_string, 10);
		const message_id: number = parseInt(message_id_string, 10);
		return await this.channelService.deleteMessage(user, channel_id, message_id);
	}

	/***********************************************************************************/
	/* 										DEBUG									   */
	/***********************************************************************************/
	// DEBUG ONLY
	@Get('allChannelsDebug')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'For debugging purpose only : Get all channels' })
	@ApiBearerAuth('JWT-auth')
	async getAllChannelsDebug(): Promise<ChannelEntity[]> {
		return await this.channelService.getAllChannelsDebug();
	}

	// DEBUG ONLY
	@Get('allChannelUsersDebug')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'For debugging purpose only : Get all channel users' })
	@ApiBearerAuth('JWT-auth')
	async getAllChannelUsersDebug(): Promise<ChannelUserEntity[]> {
		return await this.channelService.getAllChannelUsersDebug();
	}

}
