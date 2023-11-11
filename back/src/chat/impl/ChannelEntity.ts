import { IChannel } from './interfaces/IChannel';
import { IChannelUser } from './interfaces/IChannelUser';
import { IChannelMessage } from './interfaces/IChannelMessage';

export class ChannelEntity implements IChannel {
	private id: number;
	private name: string;
	private password: string;
	private isPublic: boolean;
	private created_at: Date;
	private updated_at: Date;
	private users: IChannelUser[] = [];
	private messages: IChannelMessage[] = [];

	constructor(
		id: number,
		name: string,
		isPublic: boolean,
		created_at: Date,
		updated_at: Date,
		users: IChannelUser[],
		messages: IChannelMessage[],
	) {
		this.id = id;
		this.name = name;
		this.isPublic = isPublic;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.users = users;
		this.messages = messages;

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

	// MISSING: add and remove
}
