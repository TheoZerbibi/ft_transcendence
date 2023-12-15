// COMMON
import { UseGuards, Controller, Body, Param, Get, Patch, Post, Delete, BadRequestException, ForbiddenException } from '@nestjs/common';
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
	@Get(':login/all')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all DMs' })
	@ApiBearerAuth('JWT-auth')
	async getAllDirectMessages(
		@GetUser() user: User,
		@Param('login') login: string,
	) {
		try {
			return await this.directMessageService.accessDirectMessagesWith(user, login);
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

	@Post('send')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Create direct message' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async createDirectMessage(
		@GetUser() user: User, 
		@Body() dto: CreateDirectMessageDto
	) {
		try {
			return await this.directMessageService.createDirectMessageWith(user, dto);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}
}
