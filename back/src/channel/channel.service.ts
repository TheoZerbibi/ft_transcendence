import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
//import { ConfigService } from '@nestjs/config';
//import { JwtService } from '@nestjs/jwt';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto, UpdateChannelUserDto } from './dto/update-channel.dto';
import { ChannelDto, ChannelUserDto } from './dto/channel.dto';
import { User, Channel, ChannelUser } from '@prisma/client';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto';

import {
	BadRequestException,
	Injectable,
} from '@nestjs/common';

enum PrivilegeStatus {
	NOTHING = -1,
	USER,
	ADMIN,
	OWNER,
};

@Injectable()
export class ChannelService {
	constructor(private prisma: PrismaService, private userService: UserService) {}

	//Create channels : can be public, private or protected by a password
	//
	async getChannel(channel_name: string): Promise<ChannelDto | undefined> {
		const channelDto : Channel = await this.prisma.channel.findUnique({
			where: {
				name: channel_name,
			},
		});
	//	console.log(channelDto);
		if (!channelDto) return undefined;
		return channelDto;
	}

	// Fetch a channel user status, you can't fetch data on a channel if you are banned from it
	async	getChannelUser(user: User, channel_name: string): Promise<ChannelUser | undefined>
	{
		try {
			const channel: Channel = await this.prisma.channel.findUnique({
				where: {
					name: channel_name,
				},
			});

			if (!channel) return undefined;

			const prismaUser: User = await this.prisma.user.findUnique({
				where: {
					login: user.login,
				}
			});
			if (!prismaUser) return undefined

				const channelUserDto: ChannelUser = null;

				return channelUserDto;
		} catch (e) {
			console.log(e);
		}
	}

	// Get level of privilege of a user on a given channel, you can't fetch data on a protected channel without password
	async userPrivilegeLevel(user: User, channel_name: string): Promise<PrivilegeStatus>
	{
		try {
			const channelUser: ChannelUser = await this.getChannelUser(user, channel_name);
			if (!channelUser)
				return (PrivilegeStatus.NOTHING);

			if (channelUser.is_owner === true)
				return (PrivilegeStatus.OWNER);
			else if (channelUser.is_admin === true)
				return (PrivilegeStatus.ADMIN);
			else
				return (PrivilegeStatus.USER);
		} catch (e) {
			console.log(e);
		}

	}

	async create(dto: CreateChannelDto, userId: number) {
		try {
			const channel = await this.prisma.channel.create({
				data: {
					name: dto.name,
					password: dto.password as string,
					public: dto.is_public,
				},
			});

			const channel_user = await this.prisma.channelUser.create({
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

	async getChannelUsers(user: User, channel_name: string): Promise<ChannelUser[] | null>
	{
		const channel: Channel | null = await this.getChannel(channel_name);
		if (!channel) throw new BadRequestException('this channel don\'t exist \n');

		//TODO : change from findMany to findUnique
		try{
		const me: ChannelUser | null = await this.prisma.channelUser.findFirst({
			where: {
	//			channel_user : { channel_id: channel.id, user_id: user.id },
				channel_id: channel.id,
				user_id: user.id,
			},
		});
	
		if (!channel.public && !me) throw new ForbiddenException('You don\'t have access to this channel');
		}
		catch(e)
		{
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

	// Filtre sur les channel privé dans lequel l'utilisateur n'est pas
	async findAll()
	{
		return this.prisma.channel.findMany({
			where: {
				public: true,
			},
		});
	}

	async channel_users(): Promise<ChannelUser[] | null>
	{
		const channel_users: ChannelUser[] = await this.prisma.channelUser.findMany();
		if (channel_users === null)
			return (null);
		return (channel_users);
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

	async getAllUser()
	{
		const users: ChannelUser[] = await this.prisma.channelUser.findMany();
		return [ {  name: "lol" } ]
		if (!users) return { name: "lol" } 
		return users;
	}

	//

	// Tools : fetching user status on channel
	// 		fetching channel by name
	// 		fetching user by name
	// 		fetching channel_user by channel and user
	async getPrivilegesLvl(user: User, channel_name: string) : Promise<PrivilegeStatus | null>
	{
		const channelDto = await this.getChannel(channel_name);
		const userDto = await this.userService.getUserByLogin(user.login);
		if (!userDto)
			throw new BadRequestException('User don\'t exist in database');
		const channelUser: ChannelUser = await this.prisma.channelUser.findFirst({
			where: { user_id: userDto.id, channel_id: channelDto.id },
		});
		if (!channelUser)
			return null;
		if (channelUser.is_owner)
			return PrivilegeStatus.OWNER;
		if (channelUser.is_admin)
			return PrivilegeStatus.ADMIN;
		return PrivilegeStatus.USER;
	}

	async isAdmin(user: User, channel_name: string) : Promise<boolean>
	{
		const privilegesLvl = await this.getPrivilegesLvl(user, channel_name);

		if (privilegesLvl === PrivilegeStatus.ADMIN)
		    return true;
	    return false;
	}

	async isOwner(user: User, channel_name: string) : Promise<boolean>
	{
		const privilegesLvl = await this.getPrivilegesLvl(user, channel_name);

		if (privilegesLvl === PrivilegeStatus.OWNER)
		    return true;
	    return false;
	}

	async havePrivilegesOn(user: User, target: User, channel: Channel): Promise<boolean>
	{
		const userPrivileges = await this.getPrivilegesLvl(user, channel.name);
		if (userPrivileges === null)
			throw new BadRequestException('You are not on this channel');
		const targetPrivileges = await this.getPrivilegesLvl(target, channel.name);
		if (targetPrivileges === null)
			throw new BadRequestException('Target is not on this channel');
		if (userPrivileges > targetPrivileges)
			return true;
		return false;
	}

	//Need to end implementing User modding

	// Need to check if user is admin
	async updateChannelUser(dto: UpdateChannelUserDto) {
		try {
			//	const user = this.prisma.channel_users.findMany({

			//	userService = ();
			const user: UserDto = await this.userService.getUserById(dto.user_id);

			if (!user)
				return (null);

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

	// Need to implement
	// 	User update with dto : controller shall call kick, ban or mute route, can only be performed by higher grade channel_user
	//	Channel deletion: Only owner can do it
	//
	//	Channel update: Setting, mod and delete password
	//	Quitting channel:  if (owner need to set a new owner)

	//

	// Tools : fetching user status on channel
	// 		fetching channel by name
	// 		fetching user by name
	// 		fetching channel_user by channel and user

}
