import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateChannelDto, CreateChannelUserDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelService {
	constructor(private prisma: PrismaService) {}
	async create(dto: CreateChannelDto, userId: number) {
//		try {
//			const	channel = await this.prisma.channel.create({
//				data : {
//					name: dto.name,
//					password: dto.password,
//					public: dto.is_public
//	
//				},
//			})
//	
//			const	channel_user = await this.prisma.channelUser.create({
//				data : {
//					channel_id: channel.id,
//					user_id: userId,
//					is_owner: true
//				}
//			})

//			return channel;
//	
//		} catch (e) {
//			if (e instanceof Prisma.PrismaClientKnownRequestError)
//				{
//					if (e.code === 'P2002')
//						throw new ForbiddenException('Channel name taken');
//				}
//		}
	}

	findAll() {
		return `This action returns all channel`;
	}

	findOne(id: number) {
		return `This action returns a #${id} channel`;
	}

	update(id: number, updateChannelDto: UpdateChannelDto) {
		return `This action updates a #${id} channel`;
	}

	remove(id: number) {
		return `This action removes a #${id} channel`;
	}
}
