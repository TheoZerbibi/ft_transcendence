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

	//	
	//	public async getChannelByChannelUserId(channel_user_id: number): Channel {
	//		const channel_user: channel_users = await this.retrieveChannelUser(channel_user_id);
	//	
	//		const channel: Channel = Chat.getChannelById(channel_user.channel_id);
	//	
	//		return channel;
	//	}

	//	
	//	/******** Setter *********/

	public addChannel(channelId: number, user: User): Channel
	{
		return Chat.addChannel(channelId, user);
	}

	//	Function to remove if test ok
	//	public async registerUser(socket: Socket, id: number): Promise<User>{
	//	
	//		const user: users = await this.retrieveUser(id);
	//		const channels_usr: channel_users[] = await this.retrieveUserChannel(user);
	//	
	//		return Chat.addUser(socket, id, channels_usr);
	//	}

	public async addUser(socket: Socket, user: users)
	{
		const channels_usr: channel_users[] = await this.retrieveUserChannel(user);

		return Chat.addUser(socket, user.id, channels_usr);
	}

	public removeUser(client: Socket): User | undefined
	{
		return Chat.removeUserBySocket(client);
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

	private async retrieveChannelUser(id: number)
	{
		const channel_user: channel_users = await this.prismaService.channel_users.findUnique({
			where : {
				id: id,
			}
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

	public	deleteChannel(channelEntity: any): Channel
	{
		const channel: Channel = Chat.getChannelById(channelEntity.getId());

		Chat.removeChannel(channel);;
		return channel;
	}
}
