import { Channel, ChannelUser, ChannelMessage } from '@prisma/client';
import { IChannel } from './interfaces/IChannel';
import { IChannelUser } from './interfaces/IChannelUser';
import { IChannelMessage } from './interfaces/IChannelMessage';
import { ChannelUserEntity } from './ChannelUserEntity';
import { ChannelMessageEntity } from './ChannelMessageEntity';

export class ChannelEntity implements IChannel {
	private id: number;
	private name: string;
	private password: string;
	private isPublic: boolean;
	private created_at: Date;
	private updated_at: Date;
	private users: IChannelUser[] = [];
	private messages: IChannelMessage[] = [];

	constructor(channel: Channel, channelUsers: ChannelUser[], channelMessages?: ChannelMessage[]) {
		this.id = channel.id;
		this.name = channel.name;
		this.isPublic = channel.public;
		this.created_at = channel.created_at;
		this.updated_at = channel.updated_at;
		this.users = channelUsers.map((channelUser) => new ChannelUserEntity(channelUser));
		if (channelMessages) {
			this.messages = channelMessages.map((channelMessage) => new ChannelMessageEntity(channelMessage));
		} else {
			this.messages = [];
		}

		this.password = '';
	}

	/*************************************************************************/
	/* 								GETTERS                                  */
	/*************************************************************************/
	public getId(): number {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public getPassword(): string {
		return this.password;
	}

	public getPublic(): boolean {
		return this.isPublic;
	}

	public getCreatedAt(): Date {
		return this.created_at;
	}

	public getUpdatedAt(): Date {
		return this.updated_at;
	}

	public getUsers(): IChannelUser[] {
		return this.users;
	}

	public getMessages(): IChannelMessage[] {
		return this.messages;
	}

	/*************************************************************************/
	/* 								SETTERS                                  */
	/*************************************************************************/
	public setName(name: string): void {
		this.name = name;
		this.updated_at = new Date();
	}

	public setPassword(password: string): void {
		this.password = password;
		this.updated_at = new Date();
	}

	public setPublic(isPublic: boolean): void {
		this.isPublic = isPublic;
		this.updated_at = new Date();
	}

	public setUsers(users: IChannelUser[]): void {
		this.users = users;
		this.updated_at = new Date();
	}

	public setMessages(messages: IChannelMessage[]): void {
		this.messages = messages;
		this.updated_at = new Date();
	}

	public addUser(user: IChannelUser): void {
		this.users.push(user);
		this.updated_at = new Date();
	}

	public addMessage(message: IChannelMessage): void {
		this.messages.push(message);
		this.updated_at = new Date();
	}

	public removeUser(user: IChannelUser): void {
		this.users = this.users.filter((u) => u.getId() !== user.getId());
		this.updated_at = new Date();
	}

	public removeMessage(message: IChannelMessage): void {
		this.messages = this.messages.filter((m) => m.getId() !== message.getId());
		this.updated_at = new Date();
	}
}
