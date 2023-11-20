import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
//import { ConfigService } from '@nestjs/config';
//import { JwtService } from '@nestjs/jwt';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { User } from '@prisma/client';

<<<<<<< HEAD
import { ForbiddenException, Injectable } from '@nestjs/common';
=======
import {
	BadRequestException,
	Injectable,
} from '@nestjs/common';
>>>>>>> 9703747 (added channel fetching dto)

enum PrivilegeStatus {
	NOTHING = -1,
	USER,
	ADMIN,
	OWNER,
};

@Injectable()
export class ChannelService {
	constructor(private prisma: PrismaService) {}

	//Create channels : can be public, private or protected by a password
	//
	async getChannel(channel_name: string) {
		const channelDto = await this.prisma.channel.findMany({
			where: {
				name: channel_name,
			},
		});
		console.log(typeof channelDto);
		return channelDto;
	}

	async	getChannelUser(user: User, channel_name: string)
	{
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					name: channel_name,
				},
			});

			if (!channel) throw new BadRequestException('Channel don\'t exist');

			const userDto = this.prisma.user.findUnique({
				where: {
					login: user.login,
				}
			});
			if (!channel) throw new BadRequestException('You are not registered as a user');

			const channelUserDto = null;

			return channelUserDto;
		} catch (e) {
			console.log(e);
		}
	}

	async userPrivilegeLevel(user: User, channel_name: string)
	{
		try {
			const myChannelUserDto = this.getChannelUser(user, channel_name);
			if (!myChannelUserDto)
				return (PrivilegeStatus.NOTHING);

			if (myChannelUserDto.is_owner === true)
				return (PrivilegeStatus.OWNER);
			else if (myChannelUserDto.is_admin === true)
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
		}
	}

<<<<<<< HEAD
	async getChannelUser(username: string, channel_name: string) {
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					name: channel_name,
				},
			});
			if (!channel) throw new ForbiddenException("Channel don't exist");
			//
		} catch (e) {
			console.log(e);
		}
	}

	// Need to implement
	// 	User update with dto : controller shall call kick, ban or mute route, can only be performed by higher grade channel_user
	//	Channel deletion: Only owner can do it
	//
	//	Channel update: Setting, mod and delete password
	//	Quitting channel:  if (owner need to set a new owner)

	//
=======
	// async create(dto: CreateChannelDto, userId: number) {
	// 			try {
	// 				const	channel = await this.prisma.channel.create({
	// 					data : {
	// 						name: dto.name,
	// 						password: dto.password,
	// 						public: dto.is_public
	// 					},
	// 				})
	// 				const	channel_user = await this.prisma.channelUser.create({
	// 					data : {
	// 						channel_id: channel.id,
	// 						user_id: userId,
	// 						is_owner: true,
	//						is_admin: true
	// 					}
	// 				})
	// 				return channel;
	// 			} catch (e) {
	// 				if (e instanceof Prisma.PrismaClientKnownRequestError)
	// 					{
	// 						if (e.code === 'P2002')
	// 							throw new BadRequestException('Channel name taken');
	// 					}
	// 			}
	// }
	//

	update(id: number, updateChannelDto: UpdateChannelDto) {
		console.log(updateChannelDto);
		return `This action updates a #${id} channel`;
	}
>>>>>>> 9703747 (added channel fetching dto)

	// Tools : fetching user status on channel
	// 		fetching channel by name
	// 		fetching user by name
	// 		fetching channel_user by channel and user

	//	async isAdmin(user_name: string, channel:string) : Promise<boolean>
	//	{
	//
	//		const channelDto = this.getChannel(channel);
	//	const userDto = this.getChannelUser(channelDto.id
	//		try {
	//
	//
	//			const userDto = await this.prisma.channelUser.findUnique({
	//				where : {
	//					user_id: user_name,
	//					channel_id: channel
	//				}
	//			});
	//		} catch (e) {
	//			return undefined
	//		}
	//}

	// Need to check if user is admin
	async updateChannelUser(dto: UpdateChannelDto) {
		try {
			//	const user = this.prisma.channel_users.findMany({
			const user = await this.prisma.user.findUnique({
				where: {
					login: dto.name,
				},
			});
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
	findAll() {
		return `This action returns all channel`;
	}

	findOne(id: number) {
		return `This action returns a #${id} channel`;
	}

	remove(id: number) {
		return `This action removes a #${id} channel`;
	}
}
