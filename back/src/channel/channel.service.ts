import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
//import { ConfigService } from '@nestjs/config';
//import { JwtService } from '@nestjs/jwt';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto, UpdateChannelUserDto } from './dto/update-channel.dto';
import { ChannelDto, ChannelUserDto } from './dto/channel.dto';
import { User, Channel, ChannelUser, ChannelMessage } from '@prisma/client';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto';

import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';

enum PrivilegeStatus {
	NOTHING = -1,
	USER,
	ADMIN,
	OWNER,
};

@Injectable()
export class ChannelService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService,
	) {}

	/*********************************************/
	/* 					Creation				 */
	/*********************************************/

	async create(dto: CreateChannelDto, userId: number): Promise<ChannelUser[] | null> {
		try {
			const channel = await this.prisma.channel.create({
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

			const channels = await this.prisma.channelUser.findMany();
			return channels;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new BadRequestException('Channel name taken');
			}
		}
	}
	/*********************************************/
	/* 					Message					 */
	/*********************************************/

	async postMessage(author: User, channel_id: number, content: string) {
		const channel: Channel = await this.getChannelById(channel_id);
		if (!channel) throw new BadRequestException("Channel doesn't exist");

		const channel_user: ChannelUser = await this.prisma.channelUser.findUnique({
			where: {
				channel_id_user_id: {
					channel_id: channel.id,
					user_id: author.id,
				},
			},
		});
		if (!channel_user && !channel.public)
			throw new ForbiddenException("Channel doesn't exist or you don't have right to post in it");

		//		const msg: ChannelMessage = await this.prisma.channelMessage.create();
		//			const channel = await this.prisma.channel.create({
		//				data: {
		//				},
		//			});
	}

	/*********************************************/
	/* 					Getters					 */
	/*********************************************/

	/***************** Channels ******************/

	async getChannelByName(channel_name: string): Promise<Channel | null> {
		const channel: Channel = await this.prisma.channel.findUnique({
			where: {
				name: channel_name,
			},
		});
		if (!channel) return undefined;
		return channel;
	}

	async getChannelById(channel_id: number): Promise<Channel | undefined> {
		const channel: Channel = await this.prisma.channel.findUnique({
			where: {
				id: channel_id,
			},
		});
		if (!channel) return undefined;
		return channel;
	}

	//**************** ChannelUsers ***************/

	async getAllUsers(): Promise<ChannelUser[] | null> {
		const users: ChannelUser[] = await this.prisma.channelUser.findMany();
		if (!users) return null;
		return users;
	}

	async getChannelUsers(author: User, channel_name: string): Promise<ChannelUser[] | null> {
		const channel: Channel | null = await this.getChannelByName(channel_name);
		if (!channel) throw new BadRequestException("This channel doesn't exist \n");

		//TODO : change from findMany to findUnique
		try {
			const user: ChannelUser | null = await this.prisma.channelUser.findFirst({
				where: {
					//			channel_user : { channel_id: channel.id, user_id: user.id },
					channel_id: channel.id,
					user_id: author.id,
				},
			});

			if (!channel.public && !user) throw new ForbiddenException("You don't have access to this channel");
		} catch (e) {
			console.log(e);
		}

		//		const users: ChannelUser[] | null = await this.prisma.channelUser.findMany({
		//			where: {
		//				channel_id: channel.id,
		//			},
		//		});
		//		return users;
		return null;
	}

	async getChannelUserByNames(user_name: string, channel_name: string) {
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
	async getMyChannelUser(author: User, channel_name: string): Promise<ChannelUser | undefined> {
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
						user_id: author.id,
					},
				},
			});

			return channel_user;
		} catch (e) {
			console.log(e);
		}
	}

	//---------------------------Utils Getter--------------------------------------------------
	// Get level of privilege of a user on a given channel, you can't fetch data on a protected channel without password

	async userPrivilegeLevel(user: User, channel_name: string): Promise<PrivilegeStatus> {
		try {
			const channelUser: ChannelUser = await this.getMyChannelUser(user, channel_name);
			if (!channelUser) return PrivilegeStatus.NOTHING;

			if (channelUser.is_owner === true) return PrivilegeStatus.OWNER;
			else if (channelUser.is_admin === true) return PrivilegeStatus.ADMIN;
			else return PrivilegeStatus.USER;
		} catch (e) {
			console.log(e);
		}
	}

	async getChannelMe(author: User, channel_name: string): Promise<ChannelUser | null> {
		return null;
	}

	channelIsAllowed(author: User, channel: Channel): boolean {
		if (!channel.public) {
			const channel_user: ChannelUser = null;
			//await this.prisma.channelUser.findUnique;
		}
		return true;
	}

	async imOnChannel(author: User, channel: Channel): Promise<boolean> {
		const channel_user: ChannelUser = await this.prisma.channelUser.findUnique({
			where: {
				channel_id_user_id: {
					channel_id: channel.id,
					user_id: author.id,
				},
			},
		});
		if (!channel_user) return false;
	}

	// Filtre sur les channel privé dans lequel l'utilisateur n'est pas
	async findAllPublic() {
		return this.prisma.channel.findMany({
			where: {
				public: true,
			},
		});
	}

	async channel_users(): Promise<ChannelUser[] | null> {
		const channel_users: ChannelUser[] = await this.prisma.channelUser.findMany();
		if (channel_users === null) return null;
		return channel_users;
	}

	//	const channels = await this.prisma.channel.findMany( {
	//		where: {
	//			public: true,
	//		},
	//	});

	//	return (channels);

	//	if (!channels) return null;

	//	const myChannels = await this.prisma.channelUser.findMany({
	//		where: {
	//			user_id: user.id,
	//		},
	//	});
	//	if (!myChannels) return channels;

	//	let i: number = 0;
	//	let tmp_channel: Channel | null;
	//	while (myChannels[i]) {
	//		tmp_channel = await this.prisma.channel.findUnique({
	//				where: {
	//					id: myChannels[i].id,
	//					public: false,
	//				},
	//		});

	//		if (tmp_channel)
	//			channels.push(tmp_channel);
	//		i++;
	//	}
	//	return channels;

	async modChannel(dto: UpdateChannelDto,  author: User) {

		const isOwner: boolean = await this.isOwner(author, dto.name);

		if (!isOwner) throw new ForbiddenException('You are not authorized to operate on this channel');

		const channel = await this.prisma.channel.update({
			where: {
				id: dto.id,
			},
			data: {
				...dto,
			},
		});
		if (!channel) return null; // Do things accordingly

		return channel;
	}

	// Utils
	async getPrivilegesLvl(user: User, channel_name: string) : Promise<PrivilegeStatus | null> {
		const channelDto = await this.getChannelByName(channel_name);
		const userDto = await this.userService.getUserByLogin(user.login);
		if (!userDto) throw new BadRequestException("User doesn't exist in database");
		const channelUser: ChannelUser = await this.prisma.channelUser.findFirst({
			where: { user_id: userDto.id, channel_id: channelDto.id },
		});
		if (!channelUser) return null;
		if (channelUser.is_owner) return PrivilegeStatus.OWNER;
		if (channelUser.is_admin) return PrivilegeStatus.ADMIN;
		return PrivilegeStatus.USER;
	}

	async isAdmin(user: User, channel_name: string) : Promise<boolean> {
		const privilegesLvl = await this.getPrivilegesLvl(user, channel_name);

		if (privilegesLvl === PrivilegeStatus.ADMIN) return true;
		return false;
	}

	async isOwner(user: User, channel_name: string) : Promise<boolean> {
		const privilegesLvl = await this.getPrivilegesLvl(user, channel_name);

		if (privilegesLvl === PrivilegeStatus.OWNER) return true;
		return false;
	}

	async havePrivilegesOn(user: User, target: User, channel: Channel): Promise<boolean> {
		const userPrivileges = await this.getPrivilegesLvl(user, channel.name);
		if (userPrivileges === null) throw new BadRequestException('You are not on this channel');
		const targetPrivileges = await this.getPrivilegesLvl(target, channel.name);
		if (targetPrivileges === null) throw new BadRequestException('Target is not on this channel');
		if (userPrivileges > targetPrivileges) return true;
		return false;
	}

	// Need to implement
	//	Channel deletion: Only owner can do it
	//
	//	Channel update: Setting, mod and delete password
	//	Quitting channel:  if (owner need to set a new owner)

	//

	// Tools : fetching user status on channel
	// 		fetching channel by name
	// 		fetching user by name
	// 		fetching channel_user by channel and user
	// Need to check if user is admin
	async updateChannelUser(dto: UpdateChannelUserDto) {
		try {
			const user: UserDto = await this.userService.getUserById(dto.user_id);

			if (!user) return null;

			//			const user: User = await this.prisma.channelUser.findUnique({
			//				where: {
			//					login: dto.name,
			//				},
			//			});
			//
			return user;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') throw new BadRequestException('Channel name taken');
			}
		}
	}
}
