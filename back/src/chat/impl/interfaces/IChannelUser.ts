export interface IChannelUser {
	getId(): number;
	getChannelId(): number;
	getUserId(): string;
	getIsOwner(): boolean;
	getIsAdmin(): boolean;
	getIsMuted(): number;
	getIsBan(): boolean;

	setIsOwner(isOwner: boolean): void;
	setIsAdmin(isAdmin: boolean): void;
	setIsMuted(isMuted: number): void;
	setIsBan(isBan: boolean): void;
}
