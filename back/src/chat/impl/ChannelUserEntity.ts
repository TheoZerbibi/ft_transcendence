import { ChannelUser } from '@prisma/client';
import { IChannelUser } from './interfaces/IChannelUser';

export class ChannelUserEntity implements IChannelUser {
	private channeluser_id: number;
	private channel_id: number;
	private user_id: number;
	private is_owner: boolean;
	private is_admin: boolean;
	private is_muted: Date;
	private is_banned: boolean;

	constructor(channelUser: ChannelUser) {
		this.channeluser_id = channelUser.id;
		this.channel_id = channelUser.channel_id;
		this.user_id = channelUser.user_id;
		this.is_owner = channelUser.is_owner;
		this.is_admin = channelUser.is_admin;
		this.is_muted = channelUser.is_muted;
		this.is_banned = channelUser.is_ban;
	}

	/*************************************************************************/
	/* 								GETTERS                                  */
	/*************************************************************************/
	public getChannelUserId(): number {
		return this.channeluser_id;
	}

	public getChannelId(): number {
		return this.channel_id;
	}

	public getUserId(): number {
		return this.user_id;
	}

	public isOwner(): boolean {
		return this.is_owner;
	}

	public isAdmin(): boolean {
		return this.is_admin;
	}

	public isMuted(): Date {
		return this.is_muted;
	}

	public isBanned(): boolean {
		return this.is_banned;
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

	public setIsMuted(isMuted: Date): void {
		this.is_muted = isMuted;
	}

	public setisBanned(isBanned: boolean): void {
		this.is_banned = isBanned;
	}
}