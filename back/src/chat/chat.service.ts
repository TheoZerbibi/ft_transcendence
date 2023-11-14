// COMMON
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
// ENTITIES
import { ChannelEntity } from './impl/ChannelEntity';
import { ChannelUserEntity } from './impl/ChannelUserEntity';
import { ChannelMessageEntity } from './impl/ChannelMessageEntity';
// PRISMA
import { Prisma, User, Channel, ChannelUser, ChannelMessage } from '@prisma/client';
// DTO
import { ChannelDto, ChannelListElemDto, CreateChannelDto, ChannelSettingsDto } from './dto/channel.dto';
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

	/***********************************************/
	/* 					Creation				   */
	/***********************************************/
	async create(dto: CreateChannelDto, userId: number): Promise<ChannelEntity> {
		try {
			const channel: Channel = await this.prisma.channel.create({
				data: {
					name: dto.name,
					password: dto.password as string,
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

	/***********************************************/
	/* 					Message					   */
	/***********************************************/

	/*
	async postMessage(user: User, channel_id: number, content: string) {
		const channel: Channel = await this.getChannelById(channel_id);
		// if channel doesn't exist && discussion is private : create channel
		if (!channel) throw new BadRequestException("Channel doesn't exist");

		const channel_user: ChannelUser = await this.prisma.channelUser.findUnique({
			where: {
				channel_id_user_id: {
					channel_id: channel.id,
					user_id: user.id,
				},
			},
		});
		if (!channel_user && !channel.public)
			throw new ForbiddenException("Channel doesn't exist or you don't have right to post in it");
		await this.prisma.channelMessage.create({
			data: {
				content: content,
				channel_user_id: channel.id,
			},
		});
	}
	*/

	/********************************************t***/
	/* 					Getters					   */
	/***********************************************/

	/***************** Channels ********************/
	//DEBUG ONLY
	/*
	async getAllChannels(): Promise<ChannelEntity[]> {
		return this.localChannels.map((channel) => this.toChannelListElemDto(channel)) as unknown as ChannelEntity[];
	}
	async toChannelListElemDto(channel: Channel): Promise<ChannelEntity> {
		return {
			name: channel.name,
		} as ChannelEntity;
	}
	*/
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
	//*********/

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
		const channel: ChannelEntity | null = this.localChannels.find((channel) => channel.getName() === channel_name);
		if (!channel) throw new BadRequestException("Channel doesn't exist");
		if (!this.userIsMember(user, channel)) throw new ForbiddenException('You cannot access to this channel');
		return channel;
	}

	async getChannelByIdIfAllowed(user: User, channel_id: number): Promise<ChannelEntity | null> {
		const channel: ChannelEntity | null = this.localChannels.find((channel) => channel.getId() === channel_id);
		if (!channel) throw new BadRequestException("Channel doesn't exist");
		if (!channel.getIsPublic() && !this.userIsMember(user, channel)) throw new ForbiddenException('You cannot access to this channel');
		return channel;
	}

	async getChannelByName(channel_name: string): Promise<ChannelEntity | null> {
		const channel: ChannelEntity | null = this.localChannels.find((channel) => channel.getName() === channel_name);

		return channel || null;
	}

	async getChannelById(channel_id: number): Promise<ChannelEntity | null> {
		//return this.localChannels.find((channel: ChannelEntity) => channel.getId() === channel_id);
		console.log(`Searching for channel with ID: ${channel_id}`);
		const channel = this.localChannels.find((channel: ChannelEntity) => {
			const id = channel.getId();
			console.log(`Checking channel with ID: ${id}`);
			return id === channel_id;
		});
		console.log(`Found channel: ${JSON.stringify(channel)}`);
		return channel;
	}

	//******************* Users ********************/

	async getChannelUsers(user: User, channel_name: string): Promise<ChannelUserEntity[] | null> {
		const channel: ChannelEntity = await this.getChannelByNameIfAllowed(user, channel_name);
		if (!channel) return null;
		return channel.getUsers();
	}

	async getChannelUser(user: User, channel_name: string): Promise<ChannelUserEntity | null> {
		const channel: ChannelEntity = await this.getChannelByNameIfAllowed(user, channel_name);
		if (!channel) return null;
		return channel.getUsers().find((channelUser) => channelUser.getUserId() === user.id) || null;
	}

	/***********************************************/
	/* 					Modification			   */
	/***********************************************/

	async modChannel(user: User, channel_id: number, newParamsdto: ChannelSettingsDto): Promise<ChannelEntity> {
		try {
			const channelEntity: ChannelEntity | null = await this.getChannelById(channel_id);
			if (!channelEntity) throw new BadRequestException(`Channel with id ${channel_id} doesn't exist`);

			const channelUser: ChannelUserEntity | null = await this.getChannelUser(user, channelEntity.getName());
			if (!channelUser) throw new BadRequestException("You don't have access to this channel");
			if (!channelUser.isOwner() || !channelUser.isAdmin())
				throw new ForbiddenException('You are not authorized to operate on this channel');

			await this.prisma.channel.update({
				where: {
					id: channelUser.getChannelId(),
				},
				data: {
					...newParamsdto,
					updated_at: new Date(),
				},
			});
			return channelEntity;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new BadRequestException('Channel name taken');
				console.log(e);
			}
			throw new BadRequestException(e);
		}
	}

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

	/***********************************************/
	/* 					Utils					   */
	/***********************************************/

	/*************** Permissions ****I**************/
	async userIsMember(user: User, channel: ChannelEntity): Promise<boolean> {
		const channelUsers = channel.getUsers();
		if (channelUsers.some((channelUser) => channelUser.getUserId() === user.id))
			return !channelUsers.some((channelUser) => channelUser.isBanned());
		return true;
	}

	/***************** Privileges ******************/

	/*
	async getPrivilegesLvl(user: User, channel_name: string): Promise<PrivilegeStatus | null> {
		
	}

	async isAdmin(privilegeLvl: PrivilegeStatus): Promise<boolean> {
		return privilegeLvl === PrivilegeStatus.ADMIN;
	}

	async isOwner(privilegeLvl: PrivilegeStatus): Promise<boolean> {
		return privilegeLvl === PrivilegeStatus.OWNER;
	}

	async hasPrivilegesOnTarget(user: User, target: User, channel: Channel): Promise<boolean> {
		const userPrivileges = await this.getPrivilegesLvl(user, channel.name);
		if (userPrivileges === null) throw new BadRequestException('You are not on this channel');
		const targetPrivileges = await this.getPrivilegesLvl(target, channel.name);
		if (targetPrivileges === null) throw new BadRequestException('Target is not on this channel');
		return userPrivileges > targetPrivileges;
	}
}

/* 	async getChannelUserByNames(user_name: string, channel_name: string) {
		try {
			const channel: Channel = await this.prisma.channel.findUnique({
				where: {
					name: channel_name,
				},
			});

			if (!channel) throw new BadRequestException("Channel doesn't exist");

			const user: User = await this.prisma.channelUser.findUnique({
				where: {
					login: user_name,
				},
			});

			if (!user) throw new BadRequestException("User doesn't exist");

			const channel_user: ChannelUser = await this.prisma.channelUser.findUnique({
				where: {
					channel_id_user_id: {
						channel_id: channel.id,
						user_id: user.id,
					},
				},
			});

			return channel_user;
		} catch (e) {
			console.log(e);

		}
	}

	// Fetch a channel user status, you can't fetch data on a channel if you are banned from it
	async getMyChannelUser(user: User, channel_name: string): Promise<ChannelUser | null> {
		try {
			const channel: Channel = await this.prisma.channel.findUnique({
				where: {
					name: channel_name,
				},
			});

			if (!channel) throw new BadRequestException("Channel doesn't exist");

			const channel_user: ChannelUser = await this.prisma.channelUser.findUnique({
				where: {
					channel_id_user_id: {
						channel_id: channel.id,
						user_id: user.id,
					},
				},
			});

			return channel_user;
		} catch (e) {
			console.log(e);
		}
	}
	
	async findAllChannelUsers(): Promise<ChannelUser[] | null> {
		return await this.prisma.channelUser.findMany();
	}
*/
}
