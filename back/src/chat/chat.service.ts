// COMMON
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
// PRISMA
import { Prisma, User, Channel, ChannelUser } from '@prisma/client';
// DTO
import { ChannelDto, ChannelUserDto } from './dto/channel.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto, UpdateChannelUserDto } from './dto/update-channel.dto';
import { ChannelUserDto } from '../user/dto';
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
	constructor(
		private prisma: PrismaService,
		private userService: UserService,
	) {}

	/***********************************************/
	/* 					Creation				   */
	/***********************************************/
	async create(dto: CreateChannelDto, userId: number): Promise<Channel | null> {
		try {
			const channel: Channel = await this.prisma.channel.create({
				data: {
					name: dto.name,
					password: dto.password as string,
					public: dto.is_public,
				},
			});

			await this.prisma.channelUser.create({
				data: {
					channel_id: channel.id,
					user_id: userId,
					is_owner: true,
					is_admin: true,
				},
			});
			return channel;
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

	/***********************************************/
	/* 					Getters					   */
	/***********************************************/

	/***************** Channels ********************/
	//DEBUG ONLY
	async getAllChannels(): Promise<Channel[]> {
		return await this.prisma.channel.findMany();
	}
	//*********/

	async getAllPublicChannels(): Promise<Channel[] | null> {
		const channels: Channel[] = await this.prisma.channel.findMany({
			where: {
				public: true,
			},
		});
		return channels.length ? channels : null;
	}

	async getJoinedChannels(user: ChannelUserDto): Promise<Channel[] | null> {
		const channels: Channel[] = await this.prisma.channel.findMany({
			where: {
				channel_users: {
					some: {
						user_id: user.id,
					},
				},
			},
		});
		return channels.length ? channels : null;
	}

	async getChannelByNameIfAllowed(user: ChannelUserDto, channel_name: string): Promise<Channel | null> {
		if (user.is_ban) throw new ForbiddenException('You are banned from this channel');
		const channel: Channel | null = await this.prisma.channel.findUnique({
			where: {
				name: channel_name,
			},
		});
		if (!channel.is_public && !this.isOnChannel(user, channel))
			throw new ForbiddenException('You cannot access to this channel');
		return channel;
	}

	async getChannelByIdIfAllowed(user: ChannelUserDto, channel_id: number): Promise<Channel | null> {
		const channel: Channel | null = await this.prisma.channel.findUnique({
			where: {
				id: channel_id,
			},
		});
		if (!channel.is_public && !this.isOnChannel(user, channel))
			throw new ForbiddenException('You cannot access to this channel');
		if (channel.user.is_ban) throw new ForbiddenException('You are banned from this channel');
		return channel;
	}

	async getChannelByName(channel_name: string): Promise<Channel | null> {
		const channel: Channel | null = await this.prisma.channel.findUnique({
			where: {
				name: channel_name,
			},
		});
		return channel;
	}

	async getChannelById(channel_id: number): Promise<Channel | null> {
		const channel: Channel | null = await this.prisma.channel.findUnique({
			where: {
				id: channel_id,
			},
		});
		return channel;
	}

	//******************* Users ********************/
 	// get all user in a channel : if you are { banned / not in the channel / if channel is private } you can't access it
	async getChannelUsers(user: ChannelUserDto, channel_name: string): Promise<ChannelUser[] | null> {
		const channel: Channel | null = await this.getChannelByName(channel_name);
		if (!channel) throw new BadRequestException("This channel doesn't exist");

		// Check if the user is banned
		const userInChannel = await this.prisma.channelUser.findUnique({
			where: {
				userId_channelId: {
					userId: user.id,
					channelId: channel.id,
				},
			},
		});

		if (userInChannel && userInChannel.is_banned) {
			throw new BadRequestException('You are banned from this channel');
		}

		// Rest of the function...

		//		const users: ChannelUser[] | null = await this.prisma.channelUser.findMany({
		//			where: {
		//				channel_id: channel.id,
		//			},
		//		});
		//		return users;
		return null;
	}

	/***********************************************/
	/* 					Modification			   */
	/***********************************************/
	/*
	async modChannel(dto: UpdateChannelDto, me: User) {
		try {
			const isOwner: boolean = await this.isOwner(await this.getPrivilegesLvl(me, dto.name));
			if (!isOwner) throw new ForbiddenException('You are not authorized to operate on this channel');

			const channel = await this.prisma.channel.update({
				where: {
					id: dto.id,
				},
				data: {
					// TODO
					//...dto,
				},
			});
			return channel;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new BadRequestException('Channel name taken');
			}
			throw new BadRequestException(e);
		}
	}
	*/

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
	async channelIsAllowed(user: User, channel: Channel): Promise<boolean> {
		if (!channel.public) {
			return this.isOnChannel(user, channel);
		}
		return true;
	}

	async isOnChannel(user: User, channel: Channel): Promise<boolean> {
		const channel_user: ChannelUser = await this.prisma.channelUser.findUnique({
			where: {
				channel_id_user_id: {
					channel_id: channel.id,
					user_id: user.id,
				},
			},
		});
		return channel_user ? true : false;
	}

	/***************** Privileges ******************/
	async getPrivilegesLvl(user: User, channel_name: string): Promise<PrivilegeStatus | null> {
		try {
			const channelDto: ChannelDto = await this.getChannelByName(channel_name);
			if (!channelDto) throw new BadRequestException("Channel doesn't exist");
			const channelUser: ChannelUser = await this.prisma.channelUser.findFirst({
				where: { user_id: user.id, channel_id: channelDto.id },
			});
			if (!channelUser) return null;
			if (channelUser.is_owner) return PrivilegeStatus.OWNER;
			if (channelUser.is_admin) return PrivilegeStatus.ADMIN;
			return PrivilegeStatus.USER;
		} catch (e) {
			console.log(e);
		}
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

			const prismaUser: User = await this.prisma.user.findUnique({
				where: {
					login: user_name,
				},
			});

			if (!prismaUser) throw new BadRequestException("User doesn't exist");

			const channel_user: ChannelUser = await this.prisma.channelUser.findUnique({
				where: {
					channel_id_user_id: {
						channel_id: channel.id,
						user_id: prismaUser.id,
					},
				},
			});

			return channel_user;
		} catch (e) {
			console.log(e);

		}
	}

	// Fetch a channel user status, you can't fetch data on a channel if you are banned from it
	async getMyChannelUser(user: User, channel_name: string): Promise<ChannelUser | undefined> {
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
