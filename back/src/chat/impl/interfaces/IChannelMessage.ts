export interface IChannelMessage {
	getId(): number;
	getContent(): string;
	getCreatedAt(): Date;
	getChannelUserId(): number;
}
