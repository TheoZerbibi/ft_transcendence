import { PrismaService } from 'src/prisma/prisma.service';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { channel_users, users } from '@prisma/client'
import { Channel, User, ChannelDto, UserDto } from './Channel'


// Chat only keep in memory instance of connected client and chatroom to broadcast update
// and new message to connected client

export class Chat {
	private static channel_lst: Channel[] = [];
	private static user_lst: Array<User> = [];

	constructor(private prismaService: PrismaService) { }

	//*************  Getter  *****************

	public static getChannels() {
		return Chat.channel_lst;
	}


	public static getUsers() {
		return Chat.user_lst;
	}


	public static getUserById(id: number): User | undefined
	{
		return Chat.user_lst.find((user) => { return user.getId() === id});
	}

	public static getUserBySocket(client: Socket): User | undefined
	{
		return Chat.user_lst.find((user) => { return user.getSocket() === client});
	}

	public static getChannelById(id: number): Channel | undefined
	{
		return Chat.channel_lst.find((channel) => channel.getId() === id);
	}

	public static getChannelDtos(): ChannelDto[]
	{
		const channelDtos: ChannelDto []= Chat.channel_lst.map((channel) => new ChannelDto(channel));
		return channelDtos;
	}
	public static getUserDtos(): UserDto[]
	{
		const UserDtos: UserDto[] = Chat.user_lst.map((user) => new UserDto(user));
		return UserDtos;
	}


	//	//************* Setter *******************
	//	
	public static addUser(socket: Socket, user_db: users, channels_usr: channel_users[]): User {

		let channel_tmp: Channel = null;

		const user = new User(socket, user_db);

		Chat.user_lst = Chat.user_lst.filter((user) => user.getId() !== user_db.id);
		Chat.user_lst.push(user);



		if (channels_usr !== undefined) {
			for (let i = 0; i < channels_usr.length; i++)
			{
				channel_tmp = Chat.channel_lst.find((channel) => { return (channel.getId() === channels_usr[i].id)});
				if (channel_tmp === undefined) {
					channel_tmp = new Channel(channels_usr[i].id, user);
				}
				channel_tmp.addUser(user);
				user.addChannel(channel_tmp);
			}

			return user;
		}
	}

	public static addChannel(channelId: number, user: User): Channel {
		const channel: Channel = new Channel(channelId, user);
		Chat.channel_lst.push(channel);
		return (channel);
	}

	//**************************** Remove ******************
	// Remove element
	private static removeUser(user: User): Channel[]
	{
		const channels: Channel[] = user.getChannels();

		for (let i = 0; i < channels.length; )
		{
			channels[i].removeUser(user);
			if (!channels[i].getUserNb())
				Chat.removeChannel(channels[i])
			else
				i++;
		}
		return  channels;
	}

	public static removeUserFromChannel(user_id: number, channel_id: number): Channel | undefined {
		const channel: Channel | undefined = Chat.getChannelById(channel_id);
		if (channel === undefined) {
			console.error('Trying to remove a user from a channel that don\'t exist');
			return undefined;
		}
		const user: User | undefined = Chat.getUserById(user_id);
		if (user === undefined) {
			console.error('Trying to remove a user from a channel that don\'t exist');
			return undefined;
		}
		channel.removeUser(user);
		return channel;
	}

	public static removeChannelById(id: number) {
		Chat.user_lst.forEach((user) => {
			const updatedChannels = user.getChannels().filter((channel) => channel.getId() === id);
			user.setChannels(updatedChannels);
		});
		Chat.channel_lst = Chat.channel_lst.filter((channel) => channel.getId() === id);
	}

	public static removeChannel(channel: Channel): User[]
	{
		const users: User[] = channel.getUsers();
		return users;
	}

	public static removeUserBySocket(client: Socket): User | undefined
	{
		const user: User | undefined = Chat.user_lst.find((user) => user.getSocket().id === client.id);
		if (user === undefined) {
			return (undefined);
		}
		this.removeUser(user);
		return user;
	}

	public static removeUserById(id: number): Channel[]
	{
		const user: User = Chat.user_lst.find((user) => user.getId() === id);
		return this.removeUser(user);
	}

}
