import { ChannelMessage } from '@prisma/client';
import { IChannelMessage } from './interfaces/IChannelMessage';

export class ChannelMessageEntity implements IChannelMessage {
	private message_id: number;
	private content: string;
	private created_at: Date;
	private channel_user_id: number;

	constructor(channelMessage: ChannelMessage) {
		this.message_id = channelMessage.id;
		this.content = channelMessage.content;
		this.created_at = channelMessage.created_at;
		this.channel_user_id = channelMessage.channel_user_id;
	}

	/*************************************************************************/
	/* 								GETTERS                                  */
	/*************************************************************************/
	public getMessageId(): number {
		return this.message_id;
	}

	public getContent(): string {
		return this.content;
	}

	public getCreatedAt(): Date {
		return this.created_at;
	}

	public getChannelUserId(): number {
		return this.channel_user_id;
	}
}