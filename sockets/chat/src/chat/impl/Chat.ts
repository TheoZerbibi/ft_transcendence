import { PrismaService } from 'src/prisma/prisma.service';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { channel_users, users } from '@prisma/client'


// Chat only keep in memory instance of connected client and chatroom to broadcast update
// and new message to connected client

export class Channel {
	private users: Array<User> = [];
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
		return this.users;
	}

	public removeUserById(id: number)
	{
		this.users = this.users.filter((user) => user.getId() === id);
	}

	public  removeUserBySocket(client: Socket): User | undefined
	{
		const user = this.users.find((user) => user.getSocket() === client);
		if (user === undefined)
			return undefined;
		this.removeUser(user);
		return user;
	}
}

export class UserDto {
	id: number;
	login: string;
	channels: number[];

	constructor(user: User)
	{
		this.id = user.getId();
		this.login = user.getLogin();
		this.channels = user.getChannels().map((chan) => chan.getId());
	}
}

export class ChannelDto {
	id: number;
	users: UserDto[] = []; 

	constructor(channel: Channel)
	{
		this.id = channel.getId();
		this.users = channel.getUsers().map((user) => new UserDto(user));
	}
}

export class User {
	private  socket: Socket;
	private  id: number;
	private	 login: string;
	private  channels: Channel[] = [];

	constructor(socket: Socket, user: users, channels: Channel[] = []) {
		this.socket = socket;
		this.id = user.id;
		this.login = user.login;
		this.channels = channels;
	}
	public getLogin(): string{
		return this.login;
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
		if (channel !== undefined) {
			if (!this.channels.find((chan) => chan.getId() === channel.getId())) {
				this.channels.push(channel);
			}
		}
	}

	public setChannels(channels: Channel[])
	{
		this.channels = channels;
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
			console.log(user);

			return user;
		}
	}

	public static addChannel(channelId: number, user: User): Channel {
		const channel: Channel = new Channel(channelId, user);
		Chat.channel_lst.push(channel);
		return (channel);
	}

	//	//public static addUserToChannel(channelId: number, user
	//	
	//	
	//	
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
