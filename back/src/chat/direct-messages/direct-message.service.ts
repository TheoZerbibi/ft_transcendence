// COMMON
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
// PRISMA
import { User, DirectMessage } from '@prisma/client';
// DTO
import { CreateDirectMessageDto, DirectMessageDto } from './dto/direct-message.dto';
// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

enum RequestStatus {
	DECLINED,
	PENDING,
	ACCEPTED,
}

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
			if (!targetUser) throw new BadRequestException(`User ${target_name} not found`);

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
					status: RequestStatus.ACCEPTED,
				},
			});
			if (!friend) {
				throw new BadRequestException(`You are not friend with the user ${target_name}`);
			}

			const blocked = await this.prisma.blocked.findUnique({
				where: {
					blocked_by_id_blocked_id: {
						blocked_by_id: targetUser.id,
						blocked_id: user.id,
					},
				},
			});
			if (blocked) throw new ForbiddenException(`You are blocked by the user ${target_name}`);

			const directMessages: DirectMessage[] = await this.prisma.directMessage.findMany({
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
				orderBy: {
					created_at: 'asc',
				},
				take: 50,
			});
			const directMessageDtos: DirectMessageDto[] = await Promise.all(
				directMessages.map(async (directMessage) => {
					const user = await this.prisma.user.findUnique({
						where: { id: directMessage.user_id },
					});
					const friend = await this.prisma.user.findUnique({
						where: { id: directMessage.friend_id },
					});

					return {
						id: directMessage.id,
						content: directMessage.content,
						created_at: directMessage.created_at,
						user_id: directMessage.user_id,
						username: user.display_name,
						friend_id: directMessage.friend_id,
						friend_name: friend.display_name,
					};
				}),
			);
			return directMessageDtos;
		} catch (e) {
			throw e;
		}
	}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	async createDirectMessageWith(user: User, dto: CreateDirectMessageDto): Promise<DirectMessageDto> {
		try {
			const targetUser: User | null = await this.userService.findUserByName(dto.target_login);
			if (!targetUser) throw new BadRequestException(`User ${dto.target_login} not found`);

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
				throw new BadRequestException(`You are not friend with the user ${dto.target_login}`);
			}
			const blocked = await this.prisma.blocked.findMany({
				where: {
					OR: [
						{
							blocked_by_id: targetUser.id,
							blocked_id: user.id,
						},
						{
							blocked_by_id: user.id,
							blocked_id: targetUser.id,
						},
					],
				},
			});
			if (blocked) {
				if (blocked.some((block) => block.blocked_id === user.id))
					throw new ForbiddenException(`You are blocked by the user ${dto.target_login}`);
				else if (blocked.some((block) => block.blocked_by_id === user.id))
					throw new ForbiddenException(`You've blocked the user ${dto.target_login}`);
			}
			const directMessage: DirectMessage = await this.prisma.directMessage.create({
				data: {
					user_id: user.id,
					friend_id: targetUser.id,
					content: dto.content,
				},
			});
			const directMessageDto: DirectMessageDto = {
				id: directMessage.id,
				content: directMessage.content,
				created_at: directMessage.created_at,
				user_id: directMessage.user_id,
				username: user.display_name,
				friend_id: directMessage.friend_id,
				friend_name: targetUser.display_name,
			};
			return directMessageDto;
		} catch (e) {
			throw e;
		}
	}
}
