import { DirectMessageEntity } from '../DirectMessageEntity.js';
import { FriendEntity } from '../FriendEntity';

export interface IConversation {
	getId(): number;
	getName(): string;
	getCreatedAt(): Date;
	getUpdatedAt(): Date;
	getUsers(): FriendEntity[];
	getMessages(): DirectMessageEntity[];

	setId(id: number): void;
	setName(name: string): void;
	setUsers(users: FriendEntity[]): void;
	setMessages(messages: DirectMessageEntity[]): void;

	addUser(user: FriendEntity): void;
	addMessage(message: DirectMessageEntity): void;

	removeUser(user: FriendEntity): void;
	removeMessage(message: DirectMessageEntity): void;
}
