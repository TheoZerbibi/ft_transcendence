import { Injectable } from '@nestjs/common';
import { users, channel_users, channels } from '@prisma/client';
import { Socket } from 'socket.io';
import { Chat } from './impl/Chat';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
	
	constructor(private prismaService: PrismaService) {}

	/********* Getter *********/
	public getChannels() {
		return Chat.getChannels();
	}

	public getUsers() {
		return Chat.getChatUsers();
	}


	/******** Setter *********/
	public async registerUser(socket: Socket, id: number) {

		const user: users = await this.retrieveUser(id);
		const channels_usr: channel_users[] = await this.retrieveUserChannel(user);


		Chat.addChatUser(socket, channels_usr);
//	
//	
//		Chat.addMessage
	}

	private async retrieveUserChannel(user: users): Promise<channel_users[]> {
		return await this.prismaService.channel_users.findMany({
			where : {
				user_id: user.id,
			},
		});
	}

	private async retrieveUser(id: number): Promise<users> {
		return await this.prismaService.users.findUnique({
			where : {
				id: id,
			},
			include : {
				channel_users: true,
			},
		});
	}

//	public async updateChannel(channel: channels)
//	{
//		const channel_bdd: channels = await this.prismaService.channels.findUnique({
//			where : {
//				id: channel.id,
//			},
//			include : {
//				channelUser: true,
//			},
//		
//		});
//		if (!channel_bdd)
//			throw new WsException('channel don\'t exist in database');
//	
//		Chat.updateChannel(channel_bdd);
//	}

	public removeUser(client: Socket)
	{
		Chat.removeChatUser(client);
		
	}
}
