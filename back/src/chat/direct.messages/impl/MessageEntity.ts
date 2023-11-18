import { DirectMessage } from '@prisma/client';
import { IDirectMessage } from './interfaces/IDirectMessage';

export class DirectMessageEntity implements IDirectMessage {
	private direct_message_id: number;
	private content: string;
	private created_at: Date;
	private conversation_user_id: number;

	constructor(DirectMessage: DirectMessage) {
		this.direct_message_id = DirectMessage.id;
		this.content = DirectMessage.content;
		this.created_at = DirectMessage.created_at;
		this.conversation_user_id = DirectMessage.conversation_user_id;
	}

	/*************************************************************************/
	/* 								GETTERS                                  */
	/*************************************************************************/
	public getDirectMessageId(): number {
		return this.direct_message_id;
	}

	public getContent(): string {
		return this.content;
	}

	public getCreatedAt(): Date {
		return this.created_at;
	}

	public getconversationUserId(): number {
		return this.conversation_user_id;
	}
}
