// COMMON
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
// ENTITIES
import { ChannelEntity } from './impl/ChannelEntity';
import { ChannelUserEntity } from './impl/ChannelUserEntity';
// PRISMA
import { Prisma, User, Channel, ChannelUser, ChannelMessage } from '@prisma/client';
// DTO
import { ChannelListElemDto, CreateChannelDto, ChannelSettingsDto, ChannelModPwdDto, PasswordRequiredActionDto, ChannelDto } from './dto/channel.dto';
import { ChannelUserDto, CreateChannelUserDto, ModChannelUserDto } from './dto/channel-user.dto';
import { ChannelMessageContentDto, ChannelMessageDto } from './dto/channel-message.dto';
// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';
// PWD HASHING
import argon2d from 'argon2';

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
				const [channelUsers] = await Promise.all([
					this.prisma.channelUser.findMany({
						where: { channel_id: channel.id },
					}),
				]);
				return new ChannelEntity(channel, channelUsers);
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

	async getAllPublicChannels(): Promise<ChannelListElemDto[] | null> {
		const publicChannels = this.localChannels.filter((channel) => channel.getIsPublic());
		const sortedChannels = publicChannels
			.sort((a, b) => b.getUpdatedAt().getTime() - a.getUpdatedAt().getTime())
			.slice(0, 20);
		return sortedChannels.map((channel) => ({ name: channel.getName(), updated_at: channel.getUpdatedAt() }));
	}

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
	async accessChannelByName(user: User, channel_name: string): Promise<ChannelDto | null> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException(`Channel ${channel_name} doesn't exist`);
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		if (!channelUser) throw new BadRequestException(`You are not on this channel`);
		if (channelUser.isBanned()) throw new ForbiddenException('You are banned from this channel');
		const channelDto: ChannelDto = {
			name: channelEntity.getName(),
			is_public: channelEntity.getIsPublic(),
			created_at: channelEntity.getCreatedAt(),
			updated_at: channelEntity.getUpdatedAt(),
		};
		return channelDto;
	}

	/************************************** Users ***********************************/

	// Gett all users in a channel if allowed
	async getAllChannelUsers(user: User, channel_name: string): Promise<ChannelUserDto[] | null> {
		const channel: ChannelEntity = await this.findChannelByName(channel_name);
		if (!channel) throw new BadRequestException(`Channel ${channel_name} doesn't exist`);
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channel);
		if (!channelUser) throw new BadRequestException(`You are not on this channel`);
		if (channelUser.isBanned()) throw new ForbiddenException('You are banned from this channel');

		const channelUsers: any[] = await this.prisma.channelUser.findMany({
			where: {
				channel_id: channel.getId(),
			},
			include : {
				user: {
					select: {
						login: true,
						avatar: true,
					},
				},
			},
		});
		const channelUserDtos: ChannelUserDto[] = channelUsers.map((channelUser) => {
			return {
				username: channelUser.user.login,
				avatar: channelUser.user.avatar,
				is_owner: channelUser.is_owner,
				is_admin: channelUser.is_admin,
				is_muted: channelUser.is_muted,
				is_banned: channelUser.is_ban,
			};
		});
		return channelUserDtos;
	}

	/************************************* Messages ************************************/

	async getLastMessages(user: User, channel_name: string): Promise<ChannelMessageDto[] | null> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException(`Channel ${channel_name} doesn't exist`);
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		if (!channelUser) throw new BadRequestException(`You are not on this channel`);
		if (channelUser.isBanned()) throw new ForbiddenException('You are banned from this channel');

		const messages = await this.prisma.channelMessage.findMany({
			where: {
				channel_user_id: {
					in: channelEntity.getUsers().map((user) => user.getId()),
				},
			},
			orderBy: {
				created_at: 'asc',
			},
			take: 50,
		});

		const messageDtos: ChannelMessageDto[] = await Promise.all(
			messages.map(async (message) => {
				const channelUser = await this.prisma.channelUser.findUnique({
					where: {
						id: message.channel_user_id,
					},
					select: {
						user: {
							select: {
								login: true,
								avatar: true,
							},
						},
					},
				});
				const formattedDate = new Date(message.created_at).toLocaleString('en-US', {
					month: '2-digit',
					day: '2-digit',
					year: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					hour12: true,
				});
				return {
					username: channelUser?.user?.login || '?',
					avatar: channelUser?.user?.avatar || '',
					content: message.content,
					created_at: formattedDate,
				};
			})
		);
		return messageDtos;
	}


	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	/*********************************** Channels **************************************/

	async createChannel(dto: CreateChannelDto, userId: number): Promise<ChannelEntity> {
		try {
			if (!dto.name) throw new BadRequestException('Channel name is required');
			if (dto.name.length > 20) throw new BadRequestException('Channel name too long (max 20 characters)');
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

	/************************************** Users ***********************************/

	async createChannelUser(user: User, channel_name: string, dto: CreateChannelUserDto): Promise<ChannelDto> {
		const channel: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channel) throw new BadRequestException(`Channel ${channel_name} doesn't exist`);

		const channelUserEntity: ChannelUserEntity | null = await this.findChannelUser(user, channel);
		if (channelUserEntity) {
			if (channelUserEntity.isBanned()) throw new ForbiddenException('You are banned from this channel');
			throw new BadRequestException('You are already on this channel');
		}

		if (!channel.getIsPublic() && !argon2d.verify(channel.getPassword(), dto.chan_password)) throw new BadRequestException('Wrong password');

		const channelUser: ChannelUser = await this.prisma.channelUser.create({
			data: {
				channel_id: channel.getId(),
				user_id: user.id,
			},
		});

		this.localChannels
			.find((channelEntity) => channelEntity.getName() === channel_name)
			.addUser(new ChannelUserEntity(channelUser));

		const channelDto: ChannelDto = {
			name: channel.getName(),
			is_public: channel.getIsPublic(),
			created_at: channel.getCreatedAt(),
			updated_at: channel.getUpdatedAt(),
		};
		return channelDto;
	}

	/************************************* Messages ************************************/

	async createChannelMessage(user: User, channel_name: string, messageDto: ChannelMessageContentDto): Promise<ChannelMessageDto> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException(`Channel ${channel_name} doesn't exist`);

		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		if (!channelUser) throw new BadRequestException(`You are not on this channel`);
		if (channelUser.isBanned()) throw new ForbiddenException('You are banned from this channel');
		if (channelUser.isMuted() && channelUser.isMuted() > new Date()) throw new ForbiddenException('You are muted on this channel');

		if (messageDto.content.length === 0) throw new BadRequestException('Message cannot be empty');
		if (messageDto.content.length > 200) throw new BadRequestException('Message too long (max 200 characters)');

		const channelMessage: ChannelMessage = await this.prisma.channelMessage.create({
			data: {
				channel_user_id: channelUser.getId(),
				content: messageDto.content,
				created_at: new Date(),
			},
		});
		const formattedDate = new Date(channelMessage.created_at).toLocaleString('en-US', {
			month: '2-digit',
			day: '2-digit',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		});
		const channelMessageDto: ChannelMessageDto = {
			username: user.login || '?',
			avatar: user.avatar || '',
			content: channelMessage.content,
			created_at: formattedDate,
		};
		return channelMessageDto;
	}

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/

	/************************************ Channels *************************************/

	async modChannel(user: User, channel_name: string, newParamsdto: ChannelSettingsDto): Promise<void> {
		try {
			const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
			if (!channelEntity) throw new BadRequestException(`Channel ${channel_name} doesn't exist`);

			const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
			if (!channelUser) throw new BadRequestException(`You are not on this channel`);
			if (channelUser.isBanned()) throw new ForbiddenException('You are banned from this channel');

			if (!channelUser.isAdmin())
				throw new ForbiddenException('You are not authorized to operate on this channel');

			if (!channelEntity.getIsPublic() && !argon2d.verify(channelEntity.getPassword(), newParamsdto.password)) throw new BadRequestException('Wrong password');

			const channelPrisma = await this.prisma.channel.update({
				where: {
					name: channel_name,
				},
				data: {
					name: newParamsdto.name,
					public: newParamsdto.is_public,
				},
			});
			channelEntity.setName(newParamsdto.name);
			channelEntity.setIsPublic(newParamsdto.is_public);
			channelEntity.setUpdatedAt(channelPrisma.updated_at);
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
		if (!channelEntity) throw new BadRequestException(`Channel ${channel_name} doesn't exist`);

		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		if (!channelUser) throw new BadRequestException(`You are not on this channel`);
		if (channelUser.isBanned()) throw new ForbiddenException('You are banned from this channel');

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
		channelEntity.setUpdatedAt(new Date());
	}

	/************************************** Users ***********************************/

	async setChannelUserAsAdmin(user: User, channel_name: string, dto: ModChannelUserDto): Promise<void> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException(`Channel ${channel_name} doesn't exist`);

		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		if (!channelUser) throw new BadRequestException(`You are not on this channel`);
		if (channelUser.isBanned()) throw new ForbiddenException('You are banned from this channel');

		if (!channelEntity.getIsPublic() && !argon2d.verify(channelEntity.getPassword(), dto.password)) throw new BadRequestException('Wrong password');

		if (!channelUser.isOwner()) throw new BadRequestException('You cannot set someone as admin on this channel');

		const target = await this.prisma.user.findUnique({
			where: {
				login: dto.target_login,
			},
			select: {
				id: true,
			},
		});
		if (!target) throw new BadRequestException('User does not exist');
		if (target.id === user.id) throw new BadRequestException('You cannot set yourself as admin');

		const targetChanUser: ChannelUserEntity | null = channelEntity.getUsers().find((channelUser) => {
			return channelUser.getUserId() === target.id;
		});
		if (!targetChanUser) throw new BadRequestException('User is not on this channel');
		if (targetChanUser.isAdmin()) throw new BadRequestException('User is already admin on this channel');

		targetChanUser.setIsAdmin(true);

		await this.prisma.channelUser.update({
			where: {
				id: targetChanUser.getId(),
			},
			data: {
				is_admin: targetChanUser.isAdmin(),
			},
		});
		channelEntity.setUpdatedAt(new Date());
	}

	async modChannelUser(user:User, channel_name: string, dto: ModChannelUserDto): Promise<void> {
		if (dto.action != 'mute' && dto.action != 'unmute' && dto.action != 'kick' && dto.action != 'ban' && dto.action != 'unban')
			throw new BadRequestException(`Action "${dto.action}" not supported`);
		const target = await this.prisma.user.findUnique({
			where: {
				login: dto.target_login,
			},
			select: {
				id: true,
			},
		});
		if (!target) throw new BadRequestException('User does not exist');
		if (target.id == user.id) throw new BadRequestException(`You cannot ${dto.action} yourself`);

		const targetChanUser: ChannelUserEntity | null = await this.targetIfAllowed(
			user,
			channel_name,
			target.id,
			dto.action,
			dto.password,
		);
		switch (dto.action) {
			case 'mute':
				if (!dto.muted_until) 
					throw new BadRequestException('You must specify a date to mute until');
				targetChanUser.setIsMuted(dto.muted_until);
				break;
			case 'unmute':
				targetChanUser.setIsMuted(null);
				break;
			case 'ban':
				targetChanUser.setIsBanned(true);
				break;
			case 'kick'|| 'unban':
				await this.prisma.channelUser.delete({
					where: {
						id: targetChanUser.getId(),
						user_id: target.id,
					},
				});
				const channel = this.localChannels.find((c) => c.getName() === channel_name);
				channel.removeUser(targetChanUser);
				return;
			default:
				throw new BadRequestException(`Action ${dto.action} not supported`);
		}
		await this.prisma.channelUser.update({
			where: {
				id: targetChanUser.getId(),
				user_id: target.id,
			},
			data: {
				is_ban: targetChanUser.isBanned(),
				is_muted: targetChanUser.isMuted(),
			},
		});
	}

	/***********************************************************************************/
	/* 									Deletion									   */
	/***********************************************************************************/

	/*********************************** Channels **************************************/

	async deleteChannel(user: User, channel_name: string, dto: PasswordRequiredActionDto): Promise<void> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException(`Channel ${channel_name} doesn't exist`);

		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		if (!channelUser) throw new BadRequestException(`You are not on this channel`);
		if (channelUser.isBanned()) throw new ForbiddenException('You are banned from this channel');

		if (!channelEntity.getIsPublic() && !argon2d.verify(channelEntity.getPassword(), dto.password)) throw new BadRequestException('Wrong password');

		if (!channelUser.isOwner()) throw new BadRequestException('You cannot delete a channel you do not own');
		await this.prisma.channel.delete({
			where: {
				name: channel_name,
			},
		});
		this.localChannels = this.localChannels.filter((channel) => channel.getName() !== channel_name);
	}

	/************************************ Users *************************************/

	async deleteChannelUser(user: User, channel_name: string): Promise<void> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException(`Channel ${channel_name} doesn't exist`);

		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		if (!channelUser) throw new BadRequestException(`You are not on this channel`);
		if (channelUser.isBanned()) throw new ForbiddenException('You are banned from this channel');
		if (channelUser.isOwner()) throw new BadRequestException('You cannot leave a channel you own');

		await this.prisma.channelUser.delete({
			where: {
				id: channelUser.getId(),
				user_id: channelUser.getUserId(),
			},
		});
		channelEntity.removeUser(channelUser);
		channelEntity.setUpdatedAt(new Date());
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

	/*********************************** Privileges **********************************/

	async targetIfAllowed(
		user: User,
		channel_name: string,
		target_user_id: number,
		action: string,
		pwd: string,
	): Promise<ChannelUserEntity> {
		const channelEntity: ChannelEntity | null = await this.findChannelByName(channel_name);
		if (!channelEntity) throw new BadRequestException(`Channel ${channel_name} doesn't exist`);
		const channelUser: ChannelUserEntity | null = await this.findChannelUser(user, channelEntity);
		if (!channelUser) throw new BadRequestException(`You are not on this channel`);
		if (channelUser.isBanned()) throw new ForbiddenException('You are banned from this channel');
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
