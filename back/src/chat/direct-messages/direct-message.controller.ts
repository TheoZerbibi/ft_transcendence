// COMMON
import { UseGuards, Controller, Body, Param, Get, Patch, Post, Delete } from '@nestjs/common';
// AUTH
import { JwtGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
// PRISMA
import { User, Friends, Blocked, DirectMessage } from '@prisma/client';
// DTO
import { DirectMessageDto, CreateDirectMessageDto } from './dto/direct-message.dto';
// SERVICES
import { DirectMessageService } from './direct-message.service';

@Controller('directMessage')
@ApiTags('DirectMessage')
@ApiBearerAuth()
export class DirectMessageController {
	constructor(private directMessageService: DirectMessageService) {}

	/***********************************************************************************/
	/* 										Getters									   */
	/***********************************************************************************/

	/******************************* DirectMessages Lists ******************************/

 	// Get all conversations
	@Get(':username/all')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all DMs' })
	@ApiBearerAuth('JWT-auth')
	async getAllDirectMessages(
		@GetUser() user: User,
		@Param('username') username: string,
	): Promise<DirectMessageDto[]> {
		return await this.directMessageService.accessDirectMessagesWith(user, username);
	}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	@Post(':username')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Create directMessage' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async createDirectMessage(
		@GetUser() user: User,
		@Param('username') username: string,
		@Body() dto: CreateDirectMessageDto,
	): Promise<DirectMessageDto> {
		return await this.directMessageService.createDirectMessageWith(user, username, dto);
	}

}
