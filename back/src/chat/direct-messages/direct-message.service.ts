// COMMON
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
// PRISMA
import { Prisma, User, DirectMessage, Friends, Blocked } from '@prisma/client';
// DTO
import { CreateDirectMessageDto, DirectMessageDto } from './dto/direct-message.dto';
// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DirectMessageService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService,
	) {}

	/***********************************************************************************/
	/* 										Getters									   */
	/***********************************************************************************/

	/******************************* DirectMessage Access ******************************/

	async accessDirectMessagesWith(user: User, target_name: string): Promise<DirectMessageDto[]> {
		try {
			const targetUser = await this.userService.findUserByName(target_name);
			if (!targetUser) throw new BadRequestException('User not found');

			const sender = await this.prisma.user.findUnique({
				where: {
					login: target_name,
				},
				include: {
					friends: true,
				},
			});
			if (!sender) throw new BadRequestException('User not found');

			let friend = sender.friends.find((friend) => friend.friend_id === targetUser.id);
			friend = friend ? friend : sender.friends.find((friend) => friend.user_id === targetUser.id);
			if (!friend) {
				throw new BadRequestException('You are not friend with this user');
			}

			const blocked = await this.prisma.blocked.findUnique({
				where: {
					blocked_by_id_blocked_id: {
						blocked_by_id: targetUser.id,
						blocked_id: user.id,
					},
				},
			});
			if (blocked) throw new ForbiddenException('You are blocked by this user');

			const directMessages: DirectMessage[] = await this.prisma.directMessage.findMany({
				where: {
					OR: [
						{
							id: user.id,
							friend_id: targetUser.id,
						},
						{
							id: targetUser.id,
							friend_id: user.id,
						},
					],
				},
				orderBy: {
					created_at: 'asc',
				},
				take: 50,
			});
			const directMessageDtos: DirectMessageDto[] = directMessages.map((directMessage) => ({
				id: directMessage.id,
				content: directMessage.content,
				created_at: directMessage.created_at,
				user_id: directMessage.user_id,
				friend_id: directMessage.friend_id,
			}));
			return directMessageDtos;
		} catch (e) {
			throw e;
		}
	}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	async createDirectMessageWith(
		user: User,
		target_name: string,
		dto: CreateDirectMessageDto,
	): Promise<DirectMessageDto> {
		const targetUser: User | null = await this.userService.findUserByName(target_name);
		if (!targetUser) throw new BadRequestException('User not found');

		const friend = await this.prisma.friends.findMany({
			where: {
				OR: [
					{
						user_id: user.id,
						friend_id: targetUser.id,
					},
					{
						user_id: targetUser.id,
						friend_id: user.id,
					},
				],
			},
		});
		if (!friend) {
			throw new BadRequestException('You are not friend with this user');
		}
		const blocked = await this.prisma.blocked.findUnique({
			where: {
				blocked_by_id_blocked_id: {
					blocked_by_id: targetUser.id,
					blocked_id: user.id,
				},
			},
		});
		if (blocked) {
			throw new ForbiddenException('You are blocked by this user');
		}
		const directMessage: DirectMessage = await this.prisma.directMessage.create({
			data: {
				content: dto.content,
				user_id: user.id,
				friend_id: targetUser.id,
			},
		});
		const directMessageDto: DirectMessageDto = {
			content: directMessage.content,
			created_at: directMessage.created_at,
			user_id: directMessage.user_id,
			friend_id: directMessage.friend_id,
		};
		return directMessageDto;
	}
}
