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

	/************************************** Channels ***********************************/

	async getAllPublicChannels(): Promise<ChannelListElemDto[] | null> {
		const publicChannels = this.localChannels.filter((channel) => channel.getIsPublic());

		return publicChannels.map((channel) => ({ name: channel.getName() }));
	}

	async getJoinedChannels(user: User): Promise<ChannelListElemDto[] | null> {
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

	async getChannelByNameIfAllowed(user: User, channel_name: string): Promise<ChannelEntity | null> {
		const channel: ChannelEntity | null = await this.getChannelByName(channel_name);
		if (!channel) throw new BadRequestException("Channel doesn't exist");
		if (!this.userIsMember(user, channel)) throw new ForbiddenException('You cannot access to this channel');
		return channel;
	}

	async getChannelByIdIfAllowed(user: User, channel_id: number): Promise<ChannelEntity | null> {
		const channel: ChannelEntity | null = await this.getChannelById(channel_id);
		if (!channel) throw new BadRequestException("Channel doesn't exist");
		if (!channel.getIsPublic() && !this.userIsMember(user, channel))
			throw new ForbiddenException('You cannot access to this channel');
		return channel;
	}

	async getChannelByName(channel_name: string): Promise<ChannelEntity | null> {
		const channel: ChannelEntity | null = this.localChannels.find(
			(channel: ChannelEntity) => channel.getName() === channel_name,
		);

		return channel || null;
	}

	async getChannelById(channel_id: number): Promise<ChannelEntity | null> {
		const channel: ChannelEntity | null = this.localChannels.find(
			(channel: ChannelEntity) => channel.getId() == channel_id,
		);

		return channel || null;
	}

	/************************************** Users ***********************************/

	async getAllChannelUsersByChannelName(user: User, channel_name: string): Promise<ChannelUserEntity[] | null> {
		const channel: ChannelEntity = await this.getChannelByNameIfAllowed(user, channel_name);
		if (!channel) return null;
		return channel.getUsers();
	}

	async getChannelUserByChannelName(user: User, channel_name: string): Promise<ChannelUserEntity | null> {
		const channel: ChannelEntity = await this.getChannelByNameIfAllowed(user, channel_name);
		if (!channel) return null;
		return channel.getUsers().find((channelUser) => channelUser.getUserId() === user.id) || null;
	}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	async create(dto: CreateChannelDto, userId: number): Promise<ChannelEntity> {
		try {
			if (dto.name && dto.name.length > 20) throw new BadRequestException('Channel name too long');
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

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/

	async modChannel(user: User, channel_id: number, pwd: string, newParamsdto: ChannelSettingsDto): Promise<void> {
		try {
			const channelEntity: ChannelEntity | null = await this.getChannelByIdIfAllowed(user, channel_id);
			this.checkPassword(channelEntity, pwd);
			const channelUser: ChannelUserEntity | null = await this.getChannelUserByChannelName(
				user,
				channelEntity.getName(),
			);
			if (!channelUser) throw new BadRequestException("You don't have access to this channel");
			if (!channelUser.isAdmin())
				throw new ForbiddenException('You are not authorized to operate on this channel');
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
		const channelEntity: ChannelEntity | null = await this.getChannelByIdIfAllowed(user, channel_id);
		const channelUser: ChannelUserEntity | null = await this.getChannelUserByChannelName(
			user,
			channelEntity.getName(),
		);
		if (!channelUser) throw new BadRequestException("You don't have access to this channel");
		if (!channelUser.isOwner())
			throw new ForbiddenException('You are not authorized to set or modify the password on this channel');
		this.checkPassword(channelEntity, dto.prev_pwd);
		if ((dto.new_pwd && dto.new_pwd.length > 20) || (dto.new_pwd_confirm && dto.new_pwd_confirm.length > 20))
			throw new BadRequestException('Password too long');
		if (dto.new_pwd !== dto.new_pwd_confirm) throw new BadRequestException('Passwords do not match');
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

	async joinChannel(user: User, channel_name: string): Promise<void> {
		try {
			const channel: ChannelEntity | null = await this.getChannelByName(channel_name);
			if (!channel) throw new BadRequestException("Channel doesn't exist");
			const channelUserEntity: ChannelUserEntity | null = await this.getChannelUserByChannelName(
				user,
				channel_name,
			);
			if (channelUserEntity) throw new BadRequestException('You are already on this channel');
			const channelUser = await this.prisma.channelUser.create({
				data: {
					channel_id: channel.getId(),
					user_id: user.id,
				},
			});
			this.localChannels
				.find((channelEntity) => channelEntity.getName() === channel_name)
				?.addUser(new ChannelUserEntity(channelUser));
		} catch (e) {
			throw new BadRequestException(e);
		}
	}

	/***********************************************/
	/* 					Deletion				   */
	/***********************************************/
	/*
	async updateChannelUser(dto: UpdateChannelUserDto, user: User) {
		try {
			const target: ChannelUserDto = await this.userService.getUserById(dto.user_id);
			if (!target) throw new BadRequestException("User doesn't exist");
			const channel: Channel = await this.getChannelById(dto.channel_id);
			if (!channel) throw new BadRequestException("Channel doesn't exist");
			const hasPrivilegesOnTarget = await this.hasPrivilegesOnTarget(user, target, channel);
			if (!hasPrivilegesOnTarget)
				throw new ForbiddenException('You are not authorized to operate on this channel');

			const channel_user: ChannelUser = await this.prisma.channelUser.update({
				where: {
					channel_id_user_id: {
						channel_id: dto.channel_id,
						user_id: dto.user_id,
					},
				},
				data: {
					// TODO
					//...dto,
				},
			});
			return channel_user;
		} catch (e) {
			// TODO : handle Prisma errors
			throw new BadRequestException(e);
		}
	}
	*/

	/***********************************************************************************/
	/* 										UTILS									   */
	/***********************************************************************************/

	/*************** Permissions ****I**************/
	async userIsMember(user: User, channel: ChannelEntity): Promise<boolean> {
		const channelUsers = channel.getUsers();
		if (channelUsers.some((channelUser) => channelUser.getUserId() === user.id))
			return !channelUsers.some((channelUser) => channelUser.isBanned());
		return true;
	}

	async checkPassword(channel: ChannelEntity, pwd: string): Promise<void> {
		if (channel.getPassword() && pwd !== channel.getPassword()) throw new BadRequestException('Wrong password');
	}

	/***************** Privileges ******************/

/* 	async hasPrivilegesOnTarget(user: User, target: User, channel: Channel): Promise<boolean> {
		const userPrivileges = await this.getPrivilegesLvl(user, channel.name);
		if (userPrivileges === null) throw new BadRequestException('You are not on this channel');
		const targetPrivileges = await this.getPrivilegesLvl(target, channel.name);
		if (targetPrivileges === null) throw new BadRequestException('Target is not on this channel');
		return userPrivileges > targetPrivileges;
	} */
	/***********************************************************************************/
	/* 										DEBUG									   */
	/***********************************************************************************/

	async getAllChannels(): Promise<ChannelEntity[]> {
		return this.localChannels;
	}

	async getAllChannelUsers(): Promise<ChannelUserEntity[]> {
		const channelUsers: ChannelUserEntity[] = [];
		this.localChannels.forEach((channel) => {
			channel.getUsers().forEach((channelUser) => {
				channelUsers.push(channelUser);
			});
		});
		return channelUsers;
	}
}
