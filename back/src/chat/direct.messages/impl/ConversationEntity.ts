import { User, Conversation, Friend, Message } from '@prisma/client';
import { IConversation } from './interfaces/IConversation';
import { FriendEntity } from './FriendEntity';
import { MessageEntity } from './MessageEntity.ts';

export class ConversationEntity implements IConversation {
	private id: number;
	private name: string;
	private created_at: Date;
	private updated_at: Date;
	private users: FriendEntity[] = [];
	private messages: ConversationEntity[] = [];

	constructor(Conversation: Conversation, Friends: Friend[], Conversations?: Conversation[]) {
		this.id = Conversation.id;
		this.name = Conversation.name;
		this.created_at = Conversation.created_at;
		this.updated_at = Conversation.updated_at;
		this.users = Friends.map((Friend) => new FriendEntity(Friend));
		if (Conversations) {
			this.messages = Conversations.map((Conversation) => new ConversationEntity(Conversation));
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

	public getCreatedAt(): Date {
		return this.created_at;
	}

	public getUpdatedAt(): Date {
		return this.updated_at;
	}

	public getUsers(): FriendEntity[] {
		return this.users;
	}

	public getMessages(): ConversationEntity[] {
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

	public setUsers(users: FriendEntity[]): void {
		this.users = users;
	}

	public setMessages(messages: ConversationEntity[]): void {
		this.messages = messages;
	}

	public addUser(user: FriendEntity): void {
		this.users.push(user);
	}

	public addMessage(message: ConversationEntity): void {
		this.messages.push(message);
	}

	public removeUser(user: FriendEntity): void {
		this.users = this.users.filter((u) => u.getUserId() !== user.getUserId());
	}

	public removeMessage(message: ConversationEntity): void {
		this.messages = this.messages.filter((m) => m.getMessageId() !== message.getMessageId());
	}
}
