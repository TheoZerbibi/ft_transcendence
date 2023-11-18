import { Friend } from '@prisma/client';
import { IFriend } from './interfaces/IFriend';

export class FriendEntity implements IFriend {
	private id: number;
	private conversation_id: number;
	private user_id: number;
	private is_owner: boolean;
	private is_admin: boolean;
	private is_muted: Date;
	private is_banned: boolean;

	constructor(Friend: Friend) {
		this.id = Friend.id;
		this.conversation_id = Friend.conversation_id;
		this.user_id = Friend.user_id;
		this.is_owner = Friend.is_owner;
		this.is_admin = Friend.is_admin;
		this.is_muted = Friend.is_muted;
		this.is_banned = Friend.is_ban;
	}

	/*************************************************************************/
	/* 								GETTERS                                  */
	/*************************************************************************/
	public getId(): number {
		return this.id;
	}

	public getConversationId(): number {
		return this.conversation_id;
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

	public setIsBanned(isBanned: boolean): void {
		this.is_banned = isBanned;
	}
}
