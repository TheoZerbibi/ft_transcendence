import { Injectable } from '@nestjs/common';
import { users, channel_users, channels } from '@prisma/client';
import { Socket } from 'socket.io';
import { Chat, Channel, User, ChannelDto, UserDto } from './impl/Chat';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {

	constructor(private prismaService: PrismaService) {}

	/********* Getter *********/
	public getChannels(): Channel[]{
		return Chat.getChannels();
	}

	public getUsers(): User[] {
		return Chat.getUsers();
	}

	public getUserDtos(): UserDto[]
	{
		return Chat.getUserDtos();
	}

	public getUserById(id: number): User | undefined {
		return Chat.getUserById(id);
	}

	public getChannelById(id: number): Channel | undefined {
		return Chat.getChannelById(id);
	}

	public getChannelDtos(): ChannelDto[]
	{
		return Chat.getChannelDtos();
	}

	//	/******** Setter *********/
	
	public selectChannel(client: Socket, channelName: string): void
	{
		const user: User = Chat.getUserBySocket(client);


		if (user === undefined)
			return ;
		console.debug(`New channel selected by ${user.getLogin()}`);
		user.selectChannelOn(channelName);
	}

	public addChannel(channelId: number, user: User): Channel
	{
		return Chat.addChannel(channelId, user);
	}

	public async addUser(socket: Socket, user: users)
	{
		const channels_usr: channel_users[] = await this.retrieveUserChannel(user);

		return Chat.addUser(socket, user, channels_usr);
	}

	public removeUser(user: users): void
	{
		console.log(`[ChatService] removing ${user.login} from socket buffer`);
		Chat.removeUserById(user.id);
	}

	// return removed user socket
	public removeUserFromChannelById(user_id: number, channel_id: number): Channel | undefined
	{
		return Chat.removeUserFromChannel(user_id, channel_id);
	}

	//******** Operation on Bdd can be replaced by better API-socket interface *********

	private async retrieveUserChannel(user: users): Promise<channel_users[]> {
		try {
			return await this.prismaService.channel_users.findMany({
				where : {
					user_id: user.id,
				},
			});
		} catch (e) {
			console.log(e);
		}
	}

	public	deleteChannel(channelEntity: any): Channel
	{
		const channel: Channel = Chat.getChannelById(channelEntity.getId());

		Chat.removeChannel(channel);;
		return channel;
	}
}
