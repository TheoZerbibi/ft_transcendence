import { IChannelMessage } from './IChannelMessage';
import { IChannelUser } from './IChannelUser';

export interface IChannel {
	getId(): number;
	getName(): string;
	getPassword(): string;
	getIsPublic(): boolean;
	getCreatedAt(): Date;
	getUpdatedAt(): Date;
	getUsers(): IChannelUser[];
	getMessages(): IChannelMessage[];

	setId(id: number): void;
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
