import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
//import { ConfigService } from '@nestjs/config';
//import { JwtService } from '@nestjs/jwt';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';

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

	async create(dto: CreateChannelDto, userId: number) {
		try {
			const channel = await this.prisma.channel.create({
				data: {
					name: dto.name,
					password: dto.password,
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
				if (e.code === 'P2002') throw new ForbiddenException('Channel name taken');
			}
		}
	}

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
	// 						is_owner: true
	// 					}
	// 				})
	// 				return channel;
	// 			} catch (e) {
	// 				if (e instanceof Prisma.PrismaClientKnownRequestError)
	// 					{
	// 						if (e.code === 'P2002')
	// 							throw new ForbiddenException('Channel name taken');
	// 					}
	// 			}
	// }
	//

	update(id: number, updateChannelDto: UpdateChannelDto) {
		console.log(updateChannelDto);
		return `This action updates a #${id} channel`;
	}

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
