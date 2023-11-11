import { IChannelMessage } from './interfaces/IChannelMessage';

export class ChannelMessageEntity implements IChannelMessage {
	private id: number;
	private content: string;
	private created_at: Date;
	private channel_user_id: number;

	constructor(id: number, content: string, created_at: Date, channel_user_id: number) {
		this.id = id;
		this.content = content;
		this.created_at = created_at;
		this.channel_user_id = channel_user_id;
	}

	/*************************************************************************/
	/* 								GETTERS                                  */
	/*************************************************************************/
	public getId(): number {
		return this.id;
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
