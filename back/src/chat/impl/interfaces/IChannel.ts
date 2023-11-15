import { ChannelMessageEntity } from '../ChannelMessageEntity';
import { ChannelUserEntity } from '../ChannelUserEntity';

export interface IChannel {
	getId(): number;
	getName(): string;
	getPassword(): string;
	getIsPublic(): boolean;
	getCreatedAt(): Date;
	getUpdatedAt(): Date;
	getUsers(): ChannelUserEntity[];
	getMessages(): ChannelMessageEntity[];

	setId(id: number): void;
	setName(name: string): void;
	setPassword(password: string): void;
	setPublic(publicChannel: boolean): void;
	setUsers(users: ChannelUserEntity[]): void;
	setMessages(messages: ChannelMessageEntity[]): void;

	addUser(user: ChannelUserEntity): void;
	addMessage(message: ChannelMessageEntity): void;

	removeUser(user: ChannelUserEntity): void;
	removeMessage(message: ChannelMessageEntity): void;
}
