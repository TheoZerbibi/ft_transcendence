import { IChannelMessage } from './IChannelMessage';
import { IChannelUser } from './IChannelUser';

export interface IChannel {
	id: number;
	name: string;
	password: string;
	public: boolean;
	created_at: Date;
	updated_at: Date;
	users: IChannelUser[];
	messages: IChannelMessage[];

	getId(): number;
	getName(): string;
	getPassword(): string;
	getPublic(): boolean;
	getCreatedAt(): Date;
	getUpdatedAt(): Date;
	getUsers(): IChannelUser[];
	getMessages(): IChannelMessage[];

	setName(name: string): void;
	setPassword(password: string): void;
	setPublic(publicChannel: boolean): void;
	setUsers(users: IChannelUser[]): void;
	setMessages(messages: IChannelMessage[]): void;

	addUser(user: IChannelUser): void;
	addMessage(message: IChannelMessage): void;

	removeUser(user: IChannelUser): void;
	removeMessage(message: IChannelMessage): void;
}
