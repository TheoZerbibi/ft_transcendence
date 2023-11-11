import { IChannelUser } from './interfaces/IChannelUser';

export class ChannelUserEntity implements IChannelUser {
	private id: number;
	private channel_id: number;
	private user_id: string;
	private is_owner: boolean;
	private is_admin: boolean;
	private is_muted: number;
	private is_ban: boolean;

	constructor(
		id: number,
		channel_id: number,
		user_id: string,
		is_owner: boolean,
		is_admin: boolean,
		is_muted: number,
		is_ban: boolean,
	) {
		this.id = id;
		this.channel_id = channel_id;
		this.user_id = user_id;
		this.is_owner = is_owner;
		this.is_admin = is_admin;
		this.is_muted = is_muted;
		this.is_ban = is_ban;
	}

	/*************************************************************************/
	/* 								GETTERS                                  */
	/*************************************************************************/
	public getId(): number {
		return this.id;
	}

	public getChannelId(): number {
		return this.channel_id;
	}

	public getUserId(): string {
		return this.user_id;
	}

	public getIsOwner(): boolean {
		return this.is_owner;
	}

	public getIsAdmin(): boolean {
		return this.is_admin;
	}

	public getIsMuted(): number {
		return this.is_muted;
	}

	public getIsBan(): boolean {
		return this.is_ban;
	}

	/*************************************************************************/
	/* 								SETTERS                                  */
	/*************************************************************************/
	public setIsOwner(isOwner: boolean): void {
		this.is_owner = isOwner;
	}

	public setIsAdmin(isAdmin: boolean): void {
		this.is_admin = isAdmin;
	}

	public setIsMuted(isMuted: number): void {
		this.is_muted = isMuted;
	}

	public setIsBan(isBan: boolean): void {
		this.is_ban = isBan;
	}
}