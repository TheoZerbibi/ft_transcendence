export interface IChannelMessage {
	id: number;
	content: string;
	created_at: Date;
	channel_user_id: number;

	getId(): number;
	getContent(): string;
	getCreatedAt(): Date;
	getChannelUserId(): number;
}
