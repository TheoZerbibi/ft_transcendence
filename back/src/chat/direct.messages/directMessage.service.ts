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

	/***********************************************************************************/
	/* 										Getters									   */
	/***********************************************************************************/

	/******************************* Direct Message Lists ******************************/

	async getLastConversations(user: User): Promise<User[]> {
		const friends = await this.prisma.directMessage.findMany({
			where: {
				OR: [
					{
						user_id: user.id,
					},
					{
						friend_id: user.id,
					},
				],
			},
			select: {
				user: {
					select: {
						id: true,
						login: true,
						avatar: true,
					},
				},
				friend: {
					select: {
						id: true,
						login: true,
						avatar: true,
					},
				},
			},
			orderBy: {
				created_at: 'desc',
			},
			take: 10, // Limit the result to 10 records
		});

		const usersSet = new Set<User>();
		friends.forEach((friend) => {
			if (friend.user.id !== user.id) {
				usersSet.add(friend.user);
			}
			if (friend.friend.id !== user.id) {
				usersSet.add(friend.friend);
			}
		});

		const usersList = Array.from(usersSet).slice(0, 10);
		return usersList;
	}

	/******************************* DirectMessage Access ******************************/

	async accessConversation(user: User, friend_login: string): Promise<DirectMessage[]> {

		
	}

	async findConversationByUsername() {}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	async createConversation(user: User, friend_login: string, content: string): Promise<ConversationDto> {
	}

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/

	/********************************* DirectMessages **********************************/

	async answerInConversation() {}

	/************************************** Users **************************************/

	async blockFriend() {}

	/***********************************************************************************/
	/* 									Deletion									   */
	/***********************************************************************************/

	async deleteDirectMessage() {}

	/***********************************************************************************/
	/* 										UTILS									   */
	/***********************************************************************************/
}
