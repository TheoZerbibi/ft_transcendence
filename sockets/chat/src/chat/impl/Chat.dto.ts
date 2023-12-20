import { PrismaService } from 'src/prisma/prisma.service';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { channel_users, users } from '@prisma/client'

export class Channel {
	private users: Array<User> = [];
	private name: string;
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
	channelOn: string;
	channels: number[];

	constructor(user: User)
	{
		this.id = user.getId();
		this.login = user.getLogin();
		this.channels = user.getChannels().map((chan) => chan.getId());
		this.channelOn = user.getChannelOn();
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
	private	 channelOn: string;
	private  channels: Channel[] = [];

	constructor(socket: Socket, user: users, channels: Channel[] = []) {
		this.socket = socket;
		this.id = user.id;
		this.login = user.login;
		this.channels = channels;
		this.channelOn = '';
	}
	public getLogin(): string{
		return this.login;
	}

	public selectChannelOn(channelName: string){
		this.channelOn = channelName;
	}

	public getSocket(): Socket {
		return this.socket;
	}
	
	public getChannelOn(): string {
		return this.channelOn;
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
