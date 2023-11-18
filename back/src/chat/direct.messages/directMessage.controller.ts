// COMMON
import { UseGuards, Controller, Body, Param, Get, Patch, Post, Delete } from '@nestjs/common';
// AUTH
import { JwtGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
// PRISMA
import { User, Friends, Blocked, DirectMessage } from '@prisma/client';
// DTO
import { DirectMessageDto } from './dto/direct-message.dto';
// SERVICES
import { DirectMessageService } from './directMessage.service';

@Controller('directMessage')
@ApiTags('DirectMessage')
@ApiBearerAuth()
export class DirectMessageController {
	constructor(private directMessageService: DirectMessageService) {}

	/***********************************************************************************/
	/* 										Getters									   */
	/***********************************************************************************/

	/******************************* DirectMessages Lists ******************************/

	/*
 	// Get all conversations
	@Get('all')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all DMs' })
	@ApiBearerAuth('JWT-auth')
	async getAllPublicDirectMessages() {
		return await this.directMessageService.getAllPublicDirectMessages();
	}

	//Get all directMessages on which user is
	@Get('joined')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get joined directMessage names' })
	@ApiBearerAuth('JWT-auth')
	async getJoinedDirectMessageNames(@GetUser() user: User): Promise<DirectMessageListElemDto[] | null> {
		return await this.directMessageService.getJoinedDirectMessageNames(user);
	}

	/********************************** DirectMessage Access *********************************/

	/*
	// Get a directMessage by its name
	@Get(':name')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Access to a directMessage by its name' })
	@ApiBearerAuth('JWT-auth')
	async accessDirectMessageByName(
		@GetUser() user: User,
		@Param('name') directMessage_name: string,
		@Body() pwd: string,
	): Promise<DirectMessageEntity> {
		return await this.directMessageService.accessDirectMessageByName(user, directMessage_name, pwd);
	}
	/*

	/*************************************** Users ************************************/

	/*
	//Get all users in a directMessage
	@Get(':directMessage_id/users')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all directMessage users' })
	@ApiBearerAuth('JWT-auth')
	async getAllDirectMessageUsers(
		@GetUser() user: User,
		@Param('directMessage_id') directMessage_id_string: string,
		@Body() pwd: string,
	): Promise<DirectMessageUserEntity[] | null> {
		const directMessage_id: number = parseInt(directMessage_id_string, 10);
		return await this.directMessageService.getAllDirectMessageUsers(user, directMessage_id, pwd);
	}
	*/

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	/*
	@Post('create')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Create directMessage' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async createDirectMessage(@GetUser() user: User, @Body() dto: CreateDirectMessageDto): Promise<DirectMessageEntity> {
		return await this.directMessageService.createDirectMessage(dto, user.id);
	}

	@Post(':directMessage/join')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Add user to directMessage' })
	@ApiBearerAuth('JWT-auth')
	async joinDirectMessage(
		@GetUser() user: User,
		@Param(':directMessage') directMessage_name: string,
		@Body() pwd: string,
	): Promise<void> {
		return await this.directMessageService.joinDirectMessage(user, directMessage_name, pwd);
	}
	*/

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/

	/*********************************** DirectMessage Settings ******************************/

	/*
	@Patch('settings/:directMessage_id/name_or_privacy')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Mod directMessage name & privacy' })
	@ApiBearerAuth('JWT-auth')
	async modDirectMessage(
		@GetUser() user: User,
		@Param('directMessage_id') directMessage_id_string: string,
		@Body() newParamsdto: DirectMessageSettingsDto,
		@Body() pwd: string,
	): Promise<void> {
		const directMessage_id: number = parseInt(directMessage_id_string, 10);
		return await this.directMessageService.modDirectMessage(user, directMessage_id, pwd, newParamsdto);
	}

	@Patch('settings/:directMessage_id/pwd')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Mod directMessage pwd' })
	@ApiBearerAuth('JWT-auth')
	async modDirectMessagePwd(
		@GetUser() user: User,
		@Param('directMessage_id') directMessage_id_string: string,
		@Body() directMessageModPwdDto: DirectMessageModPwdDto,
	): Promise<void> {
		const directMessage_id: number = parseInt(directMessage_id_string, 10);
		return await this.directMessageService.modDirectMessagePwd(user, directMessage_id, directMessageModPwdDto);
	}
	*/

	/*************************************** Users ************************************/

	/*
	@Patch('settings/:directMessage_id/admin/:user_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Set user as admin of directMessage' })
	@ApiBearerAuth('JWT-auth')
	async setAdmin(
		@GetUser() user: User,
		@Param('directMessage') directMessage_id_string: string,
		@Param('id') target_user_id_str: string,
		@Body() pwd: string,
	): Promise<void> {
		const directMessage_id: number = parseInt(directMessage_id_string, 10);
		const target_user_id: number = parseInt(target_user_id_str, 10);
		return await this.directMessageService.setDirectMessageUserAsAdmin(user, directMessage_id, target_user_id, pwd);
	}

	@Patch('settings/:directMessage_id/mute/:user_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Mute user from directMessage' })
	@ApiBearerAuth('JWT-auth')
	async muteUser(
		@GetUser() user: User,
		@Param('directMessage') directMessage_id_string: string,
		@Param('id') target_user_id_str: string,
		@Body() pwd: string,
	): Promise<void> {
		const directMessage_id: number = parseInt(directMessage_id_string, 10);
		const target_user_id: number = parseInt(target_user_id_str, 10);
		return await this.directMessageService.muteDirectMessageUser(user, directMessage_id, target_user_id, pwd);
	}

	@Patch('settings/:directMessage_id/unmute/:user_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Unmute user from directMessage' })
	@ApiBearerAuth('JWT-auth')
	async unmuteUser(
		@GetUser() user: User,
		@Param('directMessage') directMessage_id_string: string,
		@Param('id') target_user_id_str: string,
		@Body() pwd: string,
	): Promise<void> {
		const directMessage_id: number = parseInt(directMessage_id_string, 10);
		const target_user_id: number = parseInt(target_user_id_str, 10);
		return await this.directMessageService.unmuteDirectMessageUser(user, directMessage_id, target_user_id, pwd);
	}

	@Patch('settings/:directMessage_id/kick/:user_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Kick user from directMessage' })
	@ApiBearerAuth('JWT-auth')
	async kickUser(
		@GetUser() user: User,
		@Param('directMessage') directMessage_id_string: string,
		@Param('id') target_user_id_str: string,
		@Body() pwd: string,
	): Promise<void> {
		const directMessage_id: number = parseInt(directMessage_id_string, 10);
		const target_user_id: number = parseInt(target_user_id_str, 10);
		return await this.directMessageService.kickDirectMessageUser(user, directMessage_id, target_user_id, pwd);
	}

	@Patch('settings/:directMessage_id/ban/:user_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Ban user from directMessage' })
	@ApiBearerAuth('JWT-auth')
	async banUser(
		@GetUser() user: User,
		@Param('directMessage') directMessage_id_string: string,
		@Param('id') target_user_id_str: string,
		@Body() pwd: string,
	): Promise<void> {
		const directMessage_id: number = parseInt(directMessage_id_string, 10);
		const target_user_id: number = parseInt(target_user_id_str, 10);
		return await this.directMessageService.banDirectMessageUser(user, directMessage_id, target_user_id, pwd);
	}

	@Patch('settings/:directMessage_id/unban/:user_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Unban user from directMessage (kick them)' })
	@ApiBearerAuth('JWT-auth')
	async unbanUser(
		@GetUser() user: User,
		@Param('directMessage') directMessage_id_string: string,
		@Param('id') target_user_id_str: string,
		@Body() pwd: string,
	): Promise<void> {
		const directMessage_id: number = parseInt(directMessage_id_string, 10);
		const target_user_id: number = parseInt(target_user_id_str, 10);
		return await this.directMessageService.unbanDirectMessageUser(user, directMessage_id, target_user_id, pwd);
	}
	*/

	/***********************************************************************************/
	/* 										Messages								   */
	/***********************************************************************************/

	/*
	@Post(':directMessage_id/message')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Send message to directMessage' })
	@ApiBearerAuth('JWT-auth')
	async sendMessage(
		@GetUser() user: User,
		@Param('directMessage_id') directMessage_id_string: string,
		@Body() directMessageMessageDto: DirectMessageMessageDto,
	): Promise<DirectMessageMessageEntity> {
		const directMessage_id: number = parseInt(directMessage_id_string, 10);
		return await this.directMessageService.sendMessage(user, directMessage_id, directMessageMessageDto);
	}

	@Get(':directMessage_id/messages')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get 20 last messages from directMessage' })
	@ApiBearerAuth('JWT-auth')
	async getLastMessages(
		@GetUser() user: User,
		@Param('directMessage_id') directMessage_id_string: string,
		@Body() pwd: string,
	): Promise<DirectMessageMessageEntity[]> {
		const directMessage_id: number = parseInt(directMessage_id_string, 10);
		return await this.directMessageService.getLastMessages(user, directMessage_id, pwd);
	}

	@Delete(':directMessage_id/:message_id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Delete message from directMessage' })
	@ApiBearerAuth('JWT-auth')
	async deleteMessage(
		@GetUser() user: User,
		@Param('directMessage_id') directMessage_id_string: string,
		@Param('message_id') message_id_string: string,
	): Promise<void> {
		const directMessage_id: number = parseInt(directMessage_id_string, 10);
		const message_id: number = parseInt(message_id_string, 10);
		return await this.directMessageService.deleteMessage(user, directMessage_id, message_id);
	}
	*/

	/***********************************************************************************/
	/* 										DEBUG									   */
	/***********************************************************************************/
	/*
	// DEBUG ONLY
	@Get('allDirectMessagesDebug')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'For debugging purpose only : Get all directMessages' })
	@ApiBearerAuth('JWT-auth')
	async getAllDirectMessagesDebug(): Promise<DirectMessageEntity[]> {
		return await this.directMessageService.getAllDirectMessagesDebug();
	}

	// DEBUG ONLY
	@Get('allDirectMessageUsersDebug')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'For debugging purpose only : Get all directMessage users' })
	@ApiBearerAuth('JWT-auth')
	async getAllDirectMessageUsersDebug(): Promise<DirectMessageUserEntity[]> {
		return await this.directMessageService.getAllDirectMessageUsersDebug();
	}
 */
}
