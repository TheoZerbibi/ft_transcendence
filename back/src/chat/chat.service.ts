import {
	//ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
//import { Prisma } from '@prisma/client';
//import { JwtService } from '@nestjs/jwt';
//import { ConfigService } from '@nestjs/config';
//import {
//	//ChannelDto,
//	//ChannelUserDto
//} from './dto/createChannel.dto';
//

@Injectable()
export class ChatService {
	constructor(private prisma: PrismaService) {}

	//async createChannel(dto: ChannelDto, id: number) {
	//	try
	//	{
	//
	//		const	channel = await this.prisma.channel.create({
	//			data : {
	//				name: dto.name,
	//				password: dto.password,
	//				public: dto.is_public
	//
	//			},
	//		});
	//
	//		const	channel_user = await this.prisma.channelUser.create({
	//			data : {
	//				channel_id: channel.id,
	//				user_id: id,
	//				is_owner: true
	//			}
	//		});
	//
	//		return channel_user.channel_id;
	//
	//	} catch (e) {
	//		if (e instanceof Prisma.PrismaClientKnownRequestError)
	//		{
	//			if (e.code === 'P2002') throw new ForbiddenException('Channel name taken');
	//		}
	//	}
	//}

}
