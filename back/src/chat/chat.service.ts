// COMMON
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
// ENTITIES
import { ChannelEntity } from './impl/ChannelEntity';
import { ChannelUserEntity } from './impl/ChannelUserEntity';
import { ChannelMessageEntity } from './impl/ChannelMessageEntity';
// PRISMA
import { Prisma, User, Channel, ChannelUser, ChannelMessage } from '@prisma/client';
// DTO
import { ChannelDto, ChannelListElemDto, CreateChannelDto, ChannelSettingsDto, ChannelModPwdDto } from './dto/channel.dto';
import { ChannelUserDto, CreateChannelUserDto } from './dto/channel-user.dto';
// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { channel } from 'diagnostics_channel';

enum PrivilegeStatus {
	NOTHING = -1,
	USER,
	ADMIN,
	OWNER,
}

@Injectable()
export class ChannelService {
	localChannels: ChannelEntity[] = [];

	constructor(
		private prisma: PrismaService,
		private userService: UserService,
	) {
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
		return publicChannels.map((channel) => ({ name: channel.getName() }));
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
		return allowedChannels.map((channel) => ({ name: channel.getName() }));
	}

	/********************************** Channel Access *********************************/

	// Get a channel by its name if allowed
	async accessChannelByName(user: User, channel_name: string, pwd: string): Promise<ChannelEntity | null> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		this.checkChannelExists(channelEntity);
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);
		this.checkPassword(channelEntity, pwd);
		return channelEntity;
	}

	/************************************** Users ***********************************/

	// Gett all users in a channel if allowed
	async getAllChannelUsers(user: User, channel_id: number, pwd: string): Promise<ChannelUserEntity[] | null> {
		const channel: ChannelEntity = await this.findChannelById(channel_id);
		this.checkChannelExists(channel);
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channel);
		this.checkUserAccess(channelUser, channel);
		this.checkPassword(channel, pwd);

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
					public: dto.is_public,
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

	async joinChannel(user: User, channel_name: string, pwd: string): Promise<void> {
		try {
			const channel: ChannelEntity | null = await this.findChannelByName(channel_name);
			this.checkChannelExists(channel);
			const channelUserEntity: ChannelUserEntity | null = await this.findChannelUser(user, channel);
			if (channelUserEntity) {
				if (channelUserEntity.isBanned()) throw new ForbiddenException('You are banned from this channel');
				throw new BadRequestException('You are already on this channel');
			}
			this.checkPassword(channel, pwd);

			const channelUser = await this.prisma.channelUser.create({
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

	async modChannel(user: User, channel_id: number, pwd: string, newParamsdto: ChannelSettingsDto): Promise<void> {
		try {
			const channelEntity: ChannelEntity | null = await this.findChannelById(channel_id);
			this.checkChannelExists(channelEntity);
			const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
			this.checkUserAccess(channelUser, channelEntity);
			if (!channelUser.isAdmin())
				throw new ForbiddenException('You are not authorized to operate on this channel');
			this.checkPassword(channelEntity, pwd);

			channelEntity.setName(newParamsdto.name);
			channelEntity.setPublic(newParamsdto.is_public);
			await this.prisma.channel.update({
				where: {
					id: channel_id,
				},
				data: {
					name: channelEntity.getName(),
					public: channelEntity.getIsPublic(),
					updated_at: new Date(),
				},
			});
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new BadRequestException('Channel name taken');
				console.log(e);
			}
			throw new BadRequestException(e);
		}
	}

	async modChannelPwd(user: User, channel_id: number, dto: ChannelModPwdDto): Promise<void> {
		const channelEntity: ChannelEntity | null = await this.findChannelById(channel_id);
		this.checkChannelExists(channelEntity);
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);
		if (!channelUser.isOwner())
			throw new ForbiddenException('You are not authorized to set or modify the password on this channel');
		this.checkPassword(channelEntity, dto.prev_pwd);

		if (dto.new_pwd.length > 20 || dto.new_pwd_confirm.length > 20)
			throw new BadRequestException('Password too long (max 20 characters)');
		if (dto.new_pwd !== dto.new_pwd_confirm) throw new BadRequestException('Passwords do not match');

		dto.new_pwd ? channelEntity.setIsPwd(true) : channelEntity.setIsPwd(false);
		channelEntity.setPassword(dto.new_pwd);

		await this.prisma.channel.update({
			where: {
				id: channel_id,
			},
			data: {
				password: channelEntity.getPassword(),
				updated_at: new Date(),
			},
		});
	}

	/************************************** Users ***********************************/

	async setChannelUserAsAdmin(user: User, channel_id: number, target_user_id: number, pwd: string): Promise<void> {
		const channelEntity: ChannelEntity | null = await this.findChannelById(channel_id);
		this.checkChannelExists(channelEntity);
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);
		this.checkPassword(channelEntity, pwd);

		if (!channelUser.isOwner()) throw new BadRequestException('You cannot set someone as admin on this channel');
		const targetChanUser: ChannelUserEntity | null = channelEntity.getUsers().find((channelUser) => {
			return channelUser.getUserId() === target_user_id;
		});
		if (!targetChanUser) throw new BadRequestException('User is not on this channel');
		if (targetChanUser.isAdmin()) throw new BadRequestException('User is already admin on this channel');
		targetChanUser.setIsAdmin(true);
		await this.prisma.channelUser.update({
			where: {
				id: channel_id,
				user_id: target_user_id,
			},
			data: {
				is_admin: targetChanUser.isAdmin(),
			},
		});
	}

	async muteChannelUser(user: User, channel_id: number, target_user_id: number, pwd: string): Promise<void> {
		const targetChanUser: ChannelUserEntity | null = await this.targetIfAllowed(
			user,
			channel_id,
			target_user_id,
			'mute',
			pwd,
		);
		targetChanUser.setIsMuted(new Date());
		await this.prisma.channelUser.update({
			where: {
				id: channel_id,
				user_id: target_user_id,
			},
			data: {
				is_muted: targetChanUser.isMuted(),
			},
		});
	}

	async unmuteChannelUser(user: User, channel_id: number, target_user_id: number, pwd: string): Promise<void> {
		const targetChanUser: ChannelUserEntity | null = await this.targetIfAllowed(
			user,
			channel_id,
			target_user_id,
			'unmute',
			pwd,
		);
		targetChanUser.setIsMuted(null);
		await this.prisma.channelUser.update({
			where: {
				id: channel_id,
				user_id: target_user_id,
			},
			data: {
				is_muted: targetChanUser.isMuted(),
			},
		});
	}

	async kickChannelUser(user: User, channel_id: number, target_user_id: number, pwd: string): Promise<void> {
		const targetChanUser: ChannelUserEntity | null = await this.targetIfAllowed(
			user,
			channel_id,
			target_user_id,
			'kick',
			pwd,
		);
		await this.prisma.channelUser.delete({
			where: {
				id: channel_id,
				user_id: target_user_id,
			},
		});
		const channel = this.localChannels.find((c) => c.getId() === channel_id);
		channel.removeUser(targetChanUser);
	}

	async banChannelUser(user: User, channel_id: number, target_user_id: number, pwd: string): Promise<void> {
		const targetChanUser: ChannelUserEntity | null = await this.targetIfAllowed(
			user,
			channel_id,
			target_user_id,
			'ban',
			pwd,
		);
		targetChanUser.setIsBanned(true);
		await this.prisma.channelUser.update({
			where: {
				id: channel_id,
				user_id: target_user_id,
			},
			data: {
				is_ban: targetChanUser.isBanned(),
			},
		});
	}

	async unbanChannelUser(user: User, channel_id: number, target_user_id: number, pwd: string): Promise<void> {
		const targetChanUser: ChannelUserEntity | null = await this.targetIfAllowed(
			user,
			channel_id,
			target_user_id,
			'unban',
			pwd,
		);
		await this.prisma.channelUser.delete({
			where: {
				id: channel_id,
				user_id: target_user_id,
			},
		});
		const channel = this.localChannels.find((c) => c.getId() === channel_id);
		channel.removeUser(targetChanUser);
	}

	/***********************************************************************************/
	/* 									Deletion									   */
	/***********************************************************************************/

	async leaveChannel(user: User, channel_id: number, pwd: string): Promise<void> {
		const channelEntity: ChannelEntity | null = await this.findChannelById(channel_id);
		this.checkChannelExists(channelEntity);
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);
		this.checkPassword(channelEntity, pwd);

		if (channelUser.isOwner()) throw new BadRequestException('You cannot leave a channel you own');
		await this.prisma.channelUser.delete({
			where: {
				id: channel_id,
				user_id: channelUser.getUserId(),
			},
		});
		channelEntity.removeUser(channelUser);
	}

	async deleteChannel(user: User, channel_id: number, pwd: string): Promise<void> {
		const channelEntity: ChannelEntity | null = await this.findChannelById(channel_id);
		this.checkChannelExists(channelEntity);
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);
		this.checkPassword(channelEntity, pwd);

		if (!channelUser.isOwner()) throw new BadRequestException('You cannot delete a channel you do not own');
		await this.prisma.channel.delete({
			where: {
				id: channel_id,
			},
		});
		this.localChannels = this.localChannels.filter((channel) => channel.getId() !== channel_id);
	}

	/***********************************************************************************/
	/* 										Messages								   */
	/***********************************************************************************/

/* 	async sendMessage(user: User, dto: ChannelMessage): Promise<ChannelMessageEntity> {
		const channelEntity: ChannelEntity | null = await this.findChannelById(dto.channel_id);
		this.checkChannelExists(channelEntity);
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);
		this.checkPassword(channelEntity, dto.pwd);

		const channelMessage = await this.prisma.channelMessage.create({
			data: {
				channel_user_id: dto.channel_user_id,
				content: dto.content,
			},
		});
		return channelMessage;
	}
 */
	/***********************************************************************************/
	/* 										UTILS									   */
	/***********************************************************************************/

	/********************************** Channel Access *********************************/

	// Get a channel by its name and return null if it doesn't exist
	async findChannelByName(channel_name: string): Promise<ChannelEntity | null> {
		const channel: ChannelEntity | null = this.localChannels.find(
			(channel: ChannelEntity) => channel.getName() === channel_name,
		);
		return channel || null;
	}

	// Get a channel by its id and return null if it doesn't exist
	async findChannelById(channel_id: number): Promise<ChannelEntity | null> {
		const channel: ChannelEntity | null = this.localChannels.find(
			(channel: ChannelEntity) => channel.getId() == channel_id,
		);
		return channel || null;
	}

	// Get a channel by its name and throw an error if it doesn't exist
	async checkChannelExists(channelEntity: ChannelEntity): Promise<void> {
		if (!channelEntity) throw new BadRequestException("Channel doesn't exist");
	}

	/************************************ User Access *********************************/

	// Find a channel user in the channel entity and return null if it doesn't exist
 	async findChannelUser(user: User, channelEntity: ChannelEntity): Promise<ChannelUserEntity | null> {
		const channelUser: ChannelUserEntity | null = channelEntity
			.getUsers()
			.find((channelUser) => channelUser.getUserId() === user.id);
		return channelUser || null;
	}

	/*********************************** Permissions **********************************/

	// check if user can access to channel : if he is a member / if the channel public AND if the user is not banned
	async checkUserAccess(channelUser: ChannelUserEntity, channelEntity: ChannelEntity): Promise<void> {
		if (!channelUser && !channelEntity.getIsPublic())
			throw new BadRequestException("You don't have access to this channel");
		if (channelUser && channelUser.isBanned()) throw new ForbiddenException('You are banned from this channel');
	}

	// Check if channel has a password and if it matches the one given
	async checkPassword(channel: ChannelEntity, pwd?: string): Promise<void> {
		if (channel.getIsPwd() && pwd && pwd !== channel.getPassword()) throw new BadRequestException('Wrong password');
	}

	/*********************************** Privileges **********************************/

	async targetIfAllowed(
		user: User,
		channel_id: number,
		target_user_id: number,
		action: string,
		pwd: string,
	): Promise<ChannelUserEntity> {
		const channelEntity: ChannelEntity | null = await this.findChannelById(channel_id);
		this.checkChannelExists(channelEntity);
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		this.checkUserAccess(channelUser, channelEntity);
		this.checkPassword(channelEntity, pwd);
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
