export interface IChannelUser {
	getId(): number;
	getChannelId(): number;
	getUserId(): number;
	getIsOwner(): boolean;
	getIsAdmin(): boolean;
	getIsMuted(): Date;
	getIsBan(): boolean;

	setIsOwner(isOwner: boolean): void;
	setIsAdmin(isAdmin: boolean): void;
	setIsMuted(isMuted: Date): void;
	setIsBan(isBan: boolean): void;
}
