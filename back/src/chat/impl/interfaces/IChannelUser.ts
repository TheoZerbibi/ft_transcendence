export interface IChannelUser {
	getChannelUserId(): number;
	getChannelId(): number;
	getUserId(): number;
	isOwner(): boolean;
	isAdmin(): boolean;
	isMuted(): Date;
	isBanned(): boolean;

	setIsOwner(isOwner: boolean): void;
	setIsAdmin(isAdmin: boolean): void;
	setIsMuted(isMuted: Date): void;
	setisBanned(isBanned: boolean): void;
}
