// COMMON
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
// PRISMA
import { Prisma, User, DirectMessage, Friends, Blocked } from '@prisma/client';
// DTO
import { DirectMessageDto } from './dto/direct-message.dto';
import { ConversationDto } from './dto/conversation.dto';
// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DirectMessageService {
	constructor(private prisma: PrismaService) {}

	private async initLocalDirectMessages(): Promise<void> {}

	/***********************************************************************************/
	/* 										Getters									   */
	/***********************************************************************************/

	/******************************* Direct Message Lists ******************************/

	async getLastFriendsConversations() {}

	/******************************* DirectMessage Access ******************************/

	async findConversationByUsername() {}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	async createConversation() {}

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/

	/************************************ DirectMessages *************************************/

	async answerInConversation() {}

	/************************************** Users ***********************************/

	async blockFriend() {}

	/***********************************************************************************/
	/* 									Deletion									   */
	/***********************************************************************************/

	async deleteDirectMessage() {}

	/***********************************************************************************/
	/* 										UTILS									   */
	/***********************************************************************************/

}
