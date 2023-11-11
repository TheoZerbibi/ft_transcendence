import { ChannelUser } from '@prisma/client';
import { IChannelUser } from './interfaces/IChannelUser';

export class ChannelUserEntity implements IChannelUser {
	private id: number;
	private channel_id: number;
	private user_id: number;
	private is_owner: boolean;
	private is_admin: boolean;
	private is_muted: Date;
	private is_ban: boolean;

	constructor(channelUser: ChannelUser) {
		this.id = channelUser.id;
		this.channel_id = channelUser.channel_id;
		this.user_id = channelUser.user_id;
		this.is_owner = channelUser.is_owner;
		this.is_admin = channelUser.is_admin;
		this.is_muted = channelUser.is_muted;
		this.is_ban = channelUser.is_ban;
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

	public getUserId(): number {
		return this.user_id;
	}

	public getIsOwner(): boolean {
		return this.is_owner;
	}

	public getIsAdmin(): boolean {
		return this.is_admin;
	}

	public getIsMuted(): Date {
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

	public setIsMuted(isMuted: Date): void {
		this.is_muted = isMuted;
	}

	public setIsBan(isBan: boolean): void {
		this.is_ban = isBan;
	}
}