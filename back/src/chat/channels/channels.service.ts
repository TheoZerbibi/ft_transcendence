// COMMON
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
// ENTITIES
import { ChannelEntity } from './impl/ChannelEntity';
import { ChannelUserEntity } from './impl/ChannelUserEntity';
import { ChannelMessageEntity } from './impl/ChannelMessageEntity';
// PRISMA
import { Prisma, User, Channel, ChannelUser, ChannelMessage } from '@prisma/client';
// DTO
import { ChannelListElemDto, CreateChannelDto, ChannelSettingsDto, ChannelModPwdDto, JoinChannelDto, AdminModUserDto, PasswordRequiredActionDto } from './dto/channel.dto';
import { ChannelMessageContentDto, ChannelMessageDto } from './dto/channel-message.dto';
// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';
// PWD HASHING
import argon2d from 'argon2';
import { channel } from 'diagnostics_channel';

@Injectable()
export class ChannelService {
	localChannels: ChannelEntity[] = [];

	constructor(private prisma: PrismaService) {
		this.initLocalChannels();
	}

	private async initLocalChannels(): Promise<void> {
		try {
			const channels: Channel[] = await this.prisma.channel.findMany();
			const channelPromises = channels.map(async (channel: Channel) => {
				const [channelUsers, channelMessages] = await Promise.all([
					this.prisma.channelUser.findMany({
						where: { channel_id: channel.id },
					}),
					this.prisma.channelMessage.findMany({
						where: { channel_user_id: channel.id },
					}),
				]);
				return new ChannelEntity(channel, channelUsers, channelMessages);
			});
			this.localChannels = await Promise.all(channelPromises);
		} catch (e) {
			console.error('Failed to initialize local channels ', e);
		}
	}

	/***********************************************************************************/
	/* 										Getters									   */
	/***********************************************************************************/

	/*********************************** Channels Lists ********************************/

	// Discover channels : list of public channels
	async getAllPublicChannels(): Promise<ChannelListElemDto[] | null> {
		const publicChannels = this.localChannels.filter((channel) => channel.getIsPublic());
		const sortedChannels = publicChannels
			.sort((a, b) => b.getUpdatedAt().getTime() - a.getUpdatedAt().getTime())
			.slice(0, 20);
		return sortedChannels.map((channel) => ({ name: channel.getName(), updated_at: channel.getUpdatedAt() }));
	}

	// List joined channels
	async getJoinedChannelNames(user: User): Promise<ChannelListElemDto[] | null> {
		const joinedChannels = this.localChannels.filter((channel) => {
			const channelUsers = channel.getUsers();
			return channelUsers.some((channelUser) => channelUser.getUserId() === user.id);
		});
		const allowedChannels = joinedChannels.filter((channel) => {
			const channelUser = channel.getUsers().find((channelUser) => channelUser.getUserId() === user.id);
			return !channelUser.isBanned();
		});
		const  sortedChannels = allowedChannels
			.sort((a, b) => b.getUpdatedAt().getTime() - a.getUpdatedAt().getTime())
			.slice(0, 20);
		return sortedChannels.map((channel) => ({ name: channel.getName(), updated_at: channel.getUpdatedAt() }));
	}

	/********************************** Channel Access *********************************/

	// Get a channel by its name if allowed
	async accessChannelByName(user: User, channel_name: string): Promise<ChannelEntity | null> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException("Channel doesn't exist");
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);
		return channelEntity;
	}

	/************************************** Users ***********************************/

	// Gett all users in a channel if allowed
	async getAllChannelUsers(user: User, channel_name: string): Promise<ChannelUserEntity[] | null> {
		const channel: ChannelEntity = await this.findChannelByName(channel_name);
		if (!channel) throw new BadRequestException("Channel doesn't exist");
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channel);
		this.checkUserAccess(channelUser, channel);

		return channel.getUsers() || null;
	}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	async createChannel(dto: CreateChannelDto, userId: number): Promise<ChannelEntity> {
		try {
			if (!dto.name) throw new BadRequestException('Channel name is required');
			if (dto.name.length > 20) throw new BadRequestException('Channel name too long');
			const channel: Channel = await this.prisma.channel.create({
				data: {
					name: dto.name,
				},
			});
			const channelUser = await this.prisma.channelUser.create({
				data: {
					channel_id: channel.id,
					user_id: userId,
					is_owner: true,
					is_admin: true,
				},
			});
			const newChannelEntity = new ChannelEntity(channel, [channelUser]);
			this.localChannels.push(newChannelEntity);
			return newChannelEntity;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new BadRequestException('Channel name taken');
			}
			throw new BadRequestException(e);
		}
	}

	async joinChannel(user: User, channel_name: string, dto: JoinChannelDto): Promise<void> {
		try {
			const channel: ChannelEntity | null = await this.findChannelByName(channel_name);
			if (!channel) throw new BadRequestException("Channel doesn't exist");
			const channelUserEntity: ChannelUserEntity | null = await this.findChannelUser(user, channel);
			if (channelUserEntity) {
				if (channelUserEntity.isBanned()) throw new ForbiddenException('You are banned from this channel');
				throw new BadRequestException('You are already on this channel');
			}
			if (!channel.getIsPublic() && !argon2d.verify(channel.getPassword(), dto.password)) throw new BadRequestException('Wrong password');

			const channelUser: ChannelUser = await this.prisma.channelUser.create({
				data: {
					channel_id: channel.getId(),
					user_id: user.id,
				},
			});
			this.localChannels
				.find((channelEntity) => channelEntity.getName() === channel_name)
				.addUser(new ChannelUserEntity(channelUser));
		} catch (e) {
			throw new BadRequestException(e);
		}
	}

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/

	/************************************ Channels *************************************/

	async modChannel(user: User, channel_name: string, newParamsdto: ChannelSettingsDto): Promise<void> {
		try {
			const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
			if (!channelEntity) throw new BadRequestException("Channel doesn't exist");
			const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
			this.checkUserAccess(channelUser, channelEntity);
			if (!channelUser.isAdmin())
				throw new ForbiddenException('You are not authorized to operate on this channel');
			if (!channelEntity.getIsPublic() && !argon2d.verify(channelEntity.getPassword(), newParamsdto.password)) throw new BadRequestException('Wrong password');

			channelEntity.setName(newParamsdto.name);
			channelEntity.setIsPublic(newParamsdto.is_public);
			await this.prisma.channel.update({
				where: {
					name: channel_name,
				},
				data: {
					name: channelEntity.getName(),
					public: channelEntity.getIsPublic(),
				},
			});
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new BadRequestException('Channel name taken');
				console.log(e);
				throw new BadRequestException(e);
			}
			throw e;
		}
	}

	async modChannelPwd(user: User, channel_name: string, dto: ChannelModPwdDto): Promise<void> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException("Channel doesn't exist");
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);
		if (!channelUser.isOwner())
			throw new ForbiddenException('You are not authorized to set or modify the password on this channel');
		if (!argon2d.verify(channelEntity.getPassword(), dto.prev_pwd)) throw new BadRequestException('Wrong password');

		if (dto.new_pwd.length > 20 || dto.new_pwd_confirm.length > 20)
			throw new BadRequestException('Password too long (max 20 characters)');
		if (dto.new_pwd !== dto.new_pwd_confirm) throw new BadRequestException('Passwords do not match');
		dto.new_pwd ? channelEntity.setIsPublic(false) : channelEntity.setIsPublic(true);

		const hashedPwd = await argon2d.hash(dto.new_pwd);
		channelEntity.setPassword(hashedPwd);

		await this.prisma.channel.update({
			where: {
				name: channel_name,
			},
			data: {
				public: channelEntity.getIsPublic(),
				password: channelEntity.getPassword(),
			},
		});
	}

	/************************************** Users ***********************************/

	async setChannelUserAsAdmin(user: User, channel_name: string, dto: AdminModUserDto): Promise<void> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException("Channel doesn't exist");
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);
		if (!channelEntity.getIsPublic() && !argon2d.verify(channelEntity.getPassword(), dto.password)) throw new BadRequestException('Wrong password');

		if (!channelUser.isOwner()) throw new BadRequestException('You cannot set someone as admin on this channel');
		const targetChanUser: ChannelUserEntity | null = channelEntity.getUsers().find((channelUser) => {
			return channelUser.getUserId() === dto.target_id;
		});
		if (!targetChanUser) throw new BadRequestException('User is not on this channel');
		if (targetChanUser.isAdmin()) throw new BadRequestException('User is already admin on this channel');
		targetChanUser.setIsAdmin(true);
		await this.prisma.channelUser.update({
			where: {
				id: targetChanUser.getId(),
				user_id: dto.target_id,
			},
			data: {
				is_admin: targetChanUser.isAdmin(),
			},
		});
	}

	async muteChannelUser(user: User, channel_name: string, dto: AdminModUserDto): Promise<void> {
		const targetChanUser: ChannelUserEntity | null = await this.targetIfAllowed(
			user,
			channel_name,
			dto.target_id,
			'mute',
			dto.password,
		);
		targetChanUser.setIsMuted(new Date());
		await this.prisma.channelUser.update({
			where: {
				id: targetChanUser.getId(),
				user_id: dto.target_id,
			},
			data: {
				is_muted: targetChanUser.isMuted(),
			},
		});
	}

	async unmuteChannelUser(user: User, channel_name: string, dto: AdminModUserDto): Promise<void> {
		const targetChanUser: ChannelUserEntity | null = await this.targetIfAllowed(
			user,
			channel_name,
			dto.target_id,
			'unmute',
			dto.password,
		);
		targetChanUser.setIsMuted(null);
		await this.prisma.channelUser.update({
			where: {
				id: targetChanUser.getId(),
				user_id: dto.target_id,
			},
			data: {
				is_muted: targetChanUser.isMuted(),
			},
		});
	}

	async kickChannelUser(user: User, channel_name: string, dto: AdminModUserDto): Promise<void> {
		const targetChanUser: ChannelUserEntity | null = await this.targetIfAllowed(
			user,
			channel_name,
			dto.target_id,
			'kick',
			dto.password,
		);
		await this.prisma.channelUser.delete({
			where: {
				id: targetChanUser.getId(),
				user_id: dto.target_id,
			},
		});
		const channel = this.localChannels.find((c) => c.getName() === channel_name);
		channel.removeUser(targetChanUser);
	}

	async banChannelUser(user: User, channel_name: string, dto: AdminModUserDto): Promise<void> {
		const targetChanUser: ChannelUserEntity | null = await this.targetIfAllowed(
			user,
			channel_name,
			dto.target_id,
			'ban',
			dto.password,
		);
		targetChanUser.setIsBanned(true);
		await this.prisma.channelUser.update({
			where: {
				id: targetChanUser.getId(),
				user_id: dto.target_id,
			},
			data: {
				is_ban: targetChanUser.isBanned(),
			},
		});
	}

	async unbanChannelUser(user: User, channel_name: string, dto: AdminModUserDto): Promise<void> {
		const targetChanUser: ChannelUserEntity | null = await this.targetIfAllowed(
			user,
			channel_name,
			dto.target_id,
			'unban',
			dto.password,
		);
		await this.prisma.channelUser.delete({
			where: {
				id: targetChanUser.getId(),
				user_id: dto.target_id,
			},
		});
		const channel = this.localChannels.find((c) => c.getName() === channel_name);
		channel.removeUser(targetChanUser);
	}

	/***********************************************************************************/
	/* 									Deletion									   */
	/***********************************************************************************/

	async leaveChannel(user: User, channel_name: string): Promise<void> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException("Channel doesn't exist");
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);

		if (channelUser.isOwner()) throw new BadRequestException('You cannot leave a channel you own');
		await this.prisma.channelUser.delete({
			where: {
				id: channelUser.getId(),
				user_id: channelUser.getUserId(),
			},
		});
		channelEntity.removeUser(channelUser);
	}

	async deleteChannel(user: User, channel_name: string, dto: PasswordRequiredActionDto): Promise<void> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException("Channel doesn't exist");
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);
		if (!channelEntity.getIsPublic() && !argon2d.verify(channelEntity.getPassword(), dto.password)) throw new BadRequestException('Wrong password');

		if (!channelUser.isOwner()) throw new BadRequestException('You cannot delete a channel you do not own');
		await this.prisma.channel.delete({
			where: {
				name: channel_name,
			},
		});
		this.localChannels = this.localChannels.filter((channel) => channel.getName() !== channel_name);
	}

	/***********************************************************************************/
	/* 										Messages								   */
	/***********************************************************************************/

	async sendMessage(user: User, channel_name: string, messageDto: ChannelMessageContentDto): Promise<ChannelMessageDto> {
		if (messageDto.content.length === 0) throw new BadRequestException('Message cannot be empty');
		if (messageDto.content.length > 200) throw new BadRequestException('Message too long (max 200 characters)');
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException("Channel doesn't exist");
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);

		if (channelUser.isMuted() && channelUser.isMuted() > new Date()) throw new ForbiddenException('You are muted on this channel');
		if (messageDto.content.length > 200) throw new BadRequestException('Message too long (max 200 characters)');

		const channelMessage: ChannelMessage = await this.prisma.channelMessage.create({
			data: {
				channel_user_id: channelUser.getId(),
				content: messageDto.content,
				created_at: new Date(),
			},
		});
		const messageEntity: ChannelMessageEntity = new ChannelMessageEntity(channelMessage);
		channelEntity.addMessage(messageEntity);
		const channelMessageDto: ChannelMessageDto = {
			username: user.login,
			content: messageEntity.getContent(),
			created_at: messageEntity.getCreatedAt(),
		};
		return channelMessageDto;
	}

	async getLastMessages(user: User, channel_name: string): Promise<ChannelMessageEntity[] | null> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException("Channel doesn't exist");
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);

		const messages = await this.prisma.channelMessage.findMany({
			where: {
				channel_user_id: {
					in: channelEntity.getUsers().map((user) => user.getId()),
				},
			},
			orderBy: {
				created_at: 'desc',
			},
			take: 50,
		});
		return messages.map((message) => new ChannelMessageEntity(message));
	}

	async deleteMessage(user: User, channel_name: string, message_id: number): Promise<void> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException("Channel doesn't exist");
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);

		const messageEntity: ChannelMessageEntity | null = channelEntity
			.getMessages()
			.find((message) => message.getMessageId() === message_id);
		if (!messageEntity) throw new BadRequestException('Message does not exist');
		if (messageEntity.getChannelUserId() !== channelUser.getId())
			throw new BadRequestException('You cannot delete someone else message');
		await this.prisma.channelMessage.delete({
			where: {
				id: message_id,
			},
		});
		channelEntity.removeMessage(messageEntity);
	}

	/***********************************************************************************/
	/* 										UTILS									   */
	/***********************************************************************************/

	/********************************** Channel Access *********************************/

	// Get a channel by its name and return null if it doesn't exist
	async findChannelByName(channel_name: string): Promise<ChannelEntity | null> {
		const channel: ChannelEntity | null = this.localChannels.find(
			(channel: ChannelEntity) => channel.getName() === channel_name,
		);
		return channel;
	}

	/************************************ User Access *********************************/

	// Find a channel user in the channel entity and return null if it doesn't exist
 	async findChannelUser(user: User, channelEntity: ChannelEntity): Promise<ChannelUserEntity | null> {
		const channelUser: ChannelUserEntity | null = channelEntity
			.getUsers()
			.find((channelUser) => channelUser.getUserId() === user.id);
		return channelUser;
	}

	/*********************************** Permissions **********************************/

	// check if user can access to channel : if he is a member / if the channel public AND if the user is not banned
	async checkUserAccess(channelUser: ChannelUserEntity, channelEntity: ChannelEntity): Promise<void> {
		if (!channelUser && !channelEntity.getIsPublic())
			throw new BadRequestException("You don't have access to this channel");
		if (channelUser && channelUser.isBanned()) throw new ForbiddenException('You are banned from this channel');
	}

	/*********************************** Privileges **********************************/

	async targetIfAllowed(
		user: User,
		channel_name: string,
		target_user_id: number,
		action: string,
		pwd: string,
	): Promise<ChannelUserEntity> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException("Channel doesn't exist");
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);
		if (!channelEntity.getIsPublic() && !argon2d.verify(channelEntity.getPassword(), pwd)) throw new BadRequestException('Wrong password');
		if (!channelUser.isAdmin())
			throw new ForbiddenException(`You are not authorized to ${action} someone on this channel`);

		const targetChanUser: ChannelUserEntity | null = channelEntity.getUsers().find((channelUser) => {
			return channelUser.getUserId() === target_user_id;
		});
		if (!targetChanUser) throw new BadRequestException('User is not on this channel');
		if (targetChanUser.isOwner()) throw new BadRequestException(`You cannot ${action} the owner of this channel`);

		return targetChanUser;
	}

	/***********************************************************************************/
	/* 										DEBUG									   */
	/***********************************************************************************/

	// Get all channels with all their variables and no matter the user
	async getAllChannelsDebug(): Promise<ChannelEntity[]> {
		return this.localChannels;
	}

	// Get all channel users with all their variables and no matter the user
	async getAllChannelUsersDebug(): Promise<ChannelUserEntity[]> {
		const channelUsers: ChannelUserEntity[] = [];
		this.localChannels.forEach((channel) => {
			channel.getUsers().forEach((channelUser) => {
				channelUsers.push(channelUser);
			});
		});
		return channelUsers;
	}
}
