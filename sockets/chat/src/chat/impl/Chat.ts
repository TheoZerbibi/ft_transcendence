import { PrismaService } from 'src/prisma/prisma.service';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { channel_users, users } from '@prisma/client'


// Chat only keep in memory instance of connected client and chatroom to broadcast update
// and new message to connected client

export class Channel {
	private users: Array<User>;
	private id: number;

	constructor(id, user) {
		this.id = id;
		this.users.push(user);
	}

	public getUsers(): User[] {
		return this.users;
	}

	public getUsersSocket(): Socket[] {
		let sockets: Socket[] = [];

		for (let i = 0; i < this.users.length; i++)
		{
			sockets.push(this.users[i].getSocket());
		}
		return sockets;
	}

	public setUsers(users: User[])
	{
		this.users = users;
	}

	public getUserNb()
	{
		return this.users.length;
	}

	public getId() {
		return this.id;
	}

	public addUser(user: User) {
		this.users.push(user);
	}

	public static createArray(channels: number[], user: User): Channel[]
	{
		let channelsArray: Channel[] = [];

		for (let i = 0; i < channels.length; i++)
		{
			channelsArray.push(new Channel(channels[i], user));
		}
		return channelsArray;
	}

	public removeUser(user: User)
	{
		this.users = this.users.filter((userBuf) => userBuf === user);
	}

	public removeUserBySocket(client: Socket)
	{
		this.users= this.users.filter((user) => user.getSocket() === client);
	}
}

export class User {
	private  socket: Socket;
	private  id: number;
	private  channels: Channel[];

	constructor(socket: Socket, id: number, channels: Channel[] = []) {
		this.socket = socket;
		this.id = id;
		this.channels = channels;
	}

	public getSocket(): Socket {
		return this.socket;
	}

	public getId(): number {
		return this.id;
	}

	public getChannels(): Channel[] {
		return this.channels;
	}

	public addChannel(channel: Channel)
	{
		if (!this.channels.find((chan) => chan.getId() === channel.getId())) {
			this.channels.push(channel);
		}
	}
}

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

	public static getChannelById(id: number): Channel | undefined
	{
		return Chat.channel_lst.find((channel) => channel.getId() === id);
	}

	public static getUserById(id: number): User | undefined
	{
		return Chat.user_lst.find((user) => { return user.getId() === id});
	}


//	
//	public static getChannelConnectedUser(channelID: number): Socket[] {
//		const channel: Channel = Chat.channel_lst.find((channel) => channel.getId() === channelID);
//	
//		return channel.getUsersSocket();
//	}
//	
//	public getChannelById(id: number): Channel
//	{
//		return Chat.channel_lst.find((channel) => channel.id === id);
//	}
	
//	//************* Setter *******************
//	
	public static addUser(socket: Socket, userid: number, channels_usr: channel_users[]): User {
	
		let channel_tmp: Channel = null;

		const user = new User(socket, userid);
	
		Chat.user_lst.push(user);

		for (let i = 0; i < channels_usr.length; i++)
		{
			channel_tmp = Chat.channel_lst.find((channel) => { return (channel.getId() === channels_usr[i].id)});
			if (!channel_tmp) channel_tmp === new Channel(channels_usr[i].id, user);
			else channel_tmp.addUser(user);

			user.addChannel(channel_tmp);
		}
	
		return user;
	}
	
//	
//	public static addChannel(channelId: number, user: User) {
//		Chat.channel_lst.push(new Channel(channelId, user));
//	}
//	
//	//public static addUserToChannel(channelId: number, user
//	
//	
//	
//	//************* Remove ******************
//	//** Remove funcion return removed element so we can send this information
//	//** to frontend 
//	
//	public static removeUser(socket: Socket): User
//	{
//		const user: User = Chat.user_lst.find((user) => user.getSocket() === socket);
//	
//		Chat.user_lst = Chat.user_lst.filter((user) => !(user.getSocket() === socket));
//	
//	
//		// TODO: Remove all reference to user in channel and delete channel if no user inside
//	
//		for (let i = 0; i < channel_lst.length; i++)
//		{
//			Chat.channel_lst[i].setUser(Chat.channel_lst[i].getUsers().filter((user) => user.getSocket() ===  socket));
//		}
//		return user;
//	}
//	
//	public static removeChannel() {
//
//	}
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

	private static removeUserFromChannel(user: User) {}

	public static removeChannelById(id: number) {}



	public static removeChannel(channel: Channel): User[]
	{
		const users: User[] = channel.getUsers();
		return users;
	}

	public static removeUserBySocket(client: Socket): Channel[] | undefined
	{
		const user: User | undefined = Chat.user_lst.find((user) => user.getSocket() === client);
		if (user === undefined)
			return (undefined);
		return this.removeUser(user);
	}

	public static removeUserById(id: number): Channel[]
	{
		const user: User = Chat.user_lst.find((user) => user.getId() === id);
		return this.removeUser(user);
	}

}
