export interface IChannelUser {
	id: number;
	channel_id: number;
	user_id: string;
	is_owner: boolean;
	is_admin: boolean;
	is_muted: number;
	is_ban: boolean;

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
