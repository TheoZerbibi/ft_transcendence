import { Channel, ChannelUser, ChannelMessage } from '@prisma/client';
import { IChannel } from './interfaces/IChannel';
import { ChannelUserEntity } from './ChannelUserEntity';
import { ChannelMessageEntity } from './ChannelMessageEntity';

export class ChannelEntity implements IChannel {
	private id: number;
	private name: string;
	private password: string;
	private isPublic: boolean;
	private created_at: Date;
	private updated_at: Date;
	private users: ChannelUserEntity[] = [];
	private messages: ChannelMessageEntity[] = [];

	constructor(channel: Channel, channelUsers: ChannelUser[], channelMessages?: ChannelMessage[]) {
		this.id = channel.id;
		this.name = channel.name;
		this.is_pwd = channel.password ? true : false;
		this.password = channel.password ? channel.password : '';
		this.isPublic = channel.public;
		this.created_at = channel.created_at;
		this.updated_at = channel.updated_at;
		this.users = channelUsers.map((channelUser) => new ChannelUserEntity(channelUser));
		if (channelMessages) {
			this.messages = channelMessages.map((channelMessage) => new ChannelMessageEntity(channelMessage));
		} else {
			this.messages = [];
		}
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

	public getIsPublic(): boolean {
		return this.isPublic;
	}

	public getCreatedAt(): Date {
		return this.created_at;
	}

	public getUpdatedAt(): Date {
		return this.updated_at;
	}

	public getUsers(): ChannelUserEntity[] {
		return this.users;
	}

	public getMessages(): ChannelMessageEntity[] {
		return this.messages;
	}

	/*************************************************************************/
	/* 								SETTERS                                  */
	/*************************************************************************/
	public setId(id: number): void {
		this.id = id;
	}

	public setName(name: string): void {
		this.name = name;
	}

	public setPassword(password: string): void {
		this.password = password;
	}

	public setIsPublic(isPublic: boolean): void {
		this.isPublic = isPublic;
	}

	public setUsers(users: ChannelUserEntity[]): void {
		this.users = users;
	}

	public setMessages(messages: ChannelMessageEntity[]): void {
		this.messages = messages;
	}

	public addUser(user: ChannelUserEntity): void {
		this.users.push(user);
	}

	public addMessage(message: ChannelMessageEntity): void {
		this.messages.push(message);
	}

	public removeUser(user: ChannelUserEntity): void {
		this.users = this.users.filter((u) => u.getUserId() !== user.getUserId());
	}

	public removeMessage(message: ChannelMessageEntity): void {
		this.messages = this.messages.filter((m) => m.getMessageId() !== message.getMessageId());
	}
}
