import { PrismaService } from 'src/prisma/prisma.service';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { channel_users, users } from '@prisma/client'


// Chat only keep in memory instance of connected client and chatroom to broadcast update
// and new message to connected client

export class Channel {
	private users: Array<ChatUser>;
	private id: number;

	constructor(id, user) {
		this.id = id;
		this.users.push(user);
	}

	public getChatUsers(): ChatUser[] {
		return this.users;
	}

	public getUsersSocket(): Socket[] {
		let sockets: Socket[];

		for (let i = 0; i < this.users.length; i++)
		{
			sockets.push(this.users[i].getSocket());
		}
		return sockets;
	}

	public getId() {
		return this.id;
	}

	public addUser(user: ChatUser) {
		this.users.push(user);
	}

	public static createArray(channels: number[], user: ChatUser): Channel[]
	{
		let channelsArray: Channel[];

		for (let i = 0; i < channels.length; i++)
		{
			channelsArray.push(new Channel(channels[i], user));
		}
		return channelsArray;
	}
}

export class ChatUser {
	private  socket: Socket;
	private  channels: Array<Channel>;

	constructor(socket, channels) {
		this.socket = socket;
		channels = null;
//		for (let i = 0; i < channels.length; i++)
	}

	public getSocket() {
		return this.socket;
	}

	public getChannels() {
		return this.channels;
	}
}

export class Chat {
	private static channel_lst: Array<Channel>;
	//	private static channel_lst: Array<number>;
	private static user_lst: Array<ChatUser>;

	constructor(private prismaService: PrismaService) { }

	//*************  Getter  *****************

	public static getChannels() {
		return Chat.channel_lst;
	}

	public static getChatUsers() {
		return Chat.user_lst;
	}

	public static getChannelConnectedUser(channelID: number): Socket[] {
		const channel: Channel = Chat.channel_lst.find((channel) => channel.getId() === channelID);

		return channel.getUsersSocket();
	}

	//************* Setter *******************

	public static addChatUser(socket: Socket, channels_usr: channel_users[]) {

		let channels: Array<number>;
		for (let i = 0; i < channels_usr.length; i++)
		{
			channels.push(channels_usr[i].channel_id);
		}

		const user = new ChatUser(socket, channels);
		Chat.user_lst.push(user);

		for (let i = 0; i < channels_usr.length; i++)
		{
			Chat.channel_lst.find((channel) => { return (channel.getId() === channels_usr[i].id)}).addUser(user);
		}

		const channelsToAdd: number[] = channels.filter(
			(id) => { return Chat.channel_lst.find(
				(channel) => { return channel.getId() === id})
			});



			Chat.channel_lst.concat(Channel.createArray(channelsToAdd, user));
	}


	public static addChannel(channelId: number, user: ChatUser) {
		Chat.channel_lst.push(new Channel(channelId, user));
	}



	//************* Remove ******************
	//** Remove funcion return removed element so we can send this information
	//** to frontend 

	public static removeChatUser(socket: Socket): ChatUser
	{
		const user: ChatUser = Chat.user_lst.find((user) => user.getSocket() === socket);

		Chat.user_lst = Chat.user_lst.filter((user) => !(user.getSocket() === socket));


		// TODO: Remove all reference to user in channel and delete channel if no user inside
		return user;
	}

	public static removeChannel() {
	}
}
