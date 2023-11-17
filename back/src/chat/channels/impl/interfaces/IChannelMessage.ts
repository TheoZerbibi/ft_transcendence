export interface IChannelMessage {
	getMessageId(): number;
	getContent(): string;
	getCreatedAt(): Date;
	getChannelUserId(): number;
}
