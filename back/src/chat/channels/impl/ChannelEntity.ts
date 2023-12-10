import { Channel, ChannelUser } from '@prisma/client';
import { ChannelUserEntity } from './ChannelUserEntity';

export class ChannelEntity {
	private id: number;
	private name: string;
	private password: string;
	private isPublic: boolean;
	private created_at: Date;
	private updated_at: Date;
	private users: ChannelUserEntity[] = [];

	constructor(channel: Channel, channelUsers: ChannelUser[]) {
		this.id = channel.id;
		this.name = channel.name;
		this.password = channel.password ? channel.password : '';
		this.isPublic = channel.public;
		this.created_at = channel.created_at;
		this.updated_at = channel.updated_at;
		this.users = channelUsers.map((channelUser) => new ChannelUserEntity(channelUser));
	}

	/*************************************************************************/
	/* 								GETTERS                                  */
	/*************************************************************************/
	public getId(): number {
		return this.id;
	}
	public getName(): string {
		return this.name;
	}
	public getPassword(): string {
		return this.password;
	}
	public getIsPublic(): boolean {
		return this.isPublic;
	}
	public getCreatedAt(): Date {
		return this.created_at;
	}
	public getUpdatedAt(): Date {
		return this.updated_at;
	}
	public getUsers(): ChannelUserEntity[] {
		return this.users;
	}

	/*************************************************************************/
	/* 								SETTERS                                  */
	/*************************************************************************/
	public setId(id: number): void {
		this.id = id;
	}
	public setName(name: string): void {
		this.name = name;
	}
	public setPassword(password: string): void {
		this.password = password;
	}
	public setIsPublic(isPublic: boolean): void {
		this.isPublic = isPublic;
	}
	public setUpdatedAt(updatedAt: Date): void {
		this.updated_at = updatedAt;
	}
	public setUsers(users: ChannelUserEntity[]): void {
		this.users = users;
	}
	public addUser(user: ChannelUserEntity): void {
		this.users.push(user);
	}
	public removeUser(user: ChannelUserEntity): void {
		this.users = this.users.filter((u) => u.getUserId() !== user.getUserId());
	}
}
