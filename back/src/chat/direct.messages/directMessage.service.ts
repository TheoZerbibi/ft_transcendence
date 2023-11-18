// COMMON
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
// ENTITIES
import { DirectMessageEntity } from './impl/ConversationEntity';
import { DirectMessageUserEntity } from './impl/DirectMessageUserEntity';
import { DirectMessageMessageEntity } from './impl/DirectMessageEntity.tss';
// PRISMA
import { Prisma, User, DirectMessage, DirectMessageUser, DirectMessageMessage } from '@prisma/client';
// DTO
import { DirectMessageListElemDto, CreateDirectMessageDto, DirectMessagesettingsDto, DirectMessageModPwdDto } from './dto/DirectMessage.dto';
import { DirectMessageMessageDto } from './dto/DirectMessage-message.dto';
// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DirectMessageService {
	localDirectMessages: DirectMessageEntity[] = [];

	constructor(private prisma: PrismaService) {
		this.initLocalDirectMessages();
	}

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
