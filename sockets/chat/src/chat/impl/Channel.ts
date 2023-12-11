import { PrismaService } from 'src/prisma/prisma.service';
import { channels } from '@prisma/client';
import { Logger } from '@nestjs/common';

// Update Channel
// Remove user from a channel
// 

	export class Channels {
//	private logger: Logger = new Logger('ChannelClass');
//	private users: channel_users[];
//	constructor(private prismaService: PrismaService,
//		   private channelService: ChannelService,
//		   private channelInfo: channels) { }
//				users = this.prismaService.findUnique({
//					where : {
//						id: channelId,
//					}
//		   }
//
//	public static getUser() {
//		return users;
//	}
//
//	public static get() {
//		// Return channel updated as final form
//	}
//
//	public static addUser(user: IUser) {
//		users.push(user);
//	}
//
//	public static removeUser(user: IUser) {
//
//	}
//
//	public static getChannelsFromUID(gameUID: string): IChannel {
//		return this.games.get(gameUID);
//	}
//
//	public static getChannelsFromUser(userID: number): IChannel {
//		console.log(userID);
//		for (const game of this.games.values()) {
//			if (game.userIsInChannel(userID)) return game;
//		}
//		console.log('after');
//		return null;
//	}
//
//	isEnded(): boolean {
//		return this.isEnd;
//	}
//
//	getChannelUID(): string {
//		return this.gameUID;
//	}
//
//	addUser(user: IUser): void {
//		this.usersInChannel.push(user);
//	}
//
//	removeUser(user: IUser): void {
//		this.usersInChannel = this.usersInChannel.filter((u) => u.user.id !== user.user.id);
//	}
//
//	getUser(userID: number) {
//		return this.usersInChannel.find((user) => user.user.id === userID);
//	}
//
//	getUsersInChannel(): Array<IUser> {
//		return this.usersInChannel.filter((user) => !user.isSpec);
//	}
//
//	getSpectatorsInChannel(): Array<IUser> {
//		return this.usersInChannel.filter((user) => user.isSpec);
//	}
//
//	getAllUsersInChannel(): Array<IUser> {
//		return this.usersInChannel;
//	}
//
//	async startChannel(): Promise<void> {
//		this.inProgress = true;
//		console.log('Channel started');
//		await this.prismaService.games.update({
//			where: {
//				uid: this.gameUID,
//			},
//			data: {
//				started_at: new Date(),
//			},
//		});
//	}
//
//	async endChannel(): Promise<void> {
//		this.isEnd = true;
//		console.log('Channel ended');
//		await this.prismaService.games.update({
//			where: {
//				uid: this.gameUID,
//			},
//			data: {
//				end_at: new Date(),
//			},
//		});
//	}
//
//	userIsInChannel(userId: number): boolean {
//		return this.usersInChannel.some((user) => user.user.id === userId);
//	}
//
//	userIsSpectator(userId: number): boolean {
//		return this.usersInChannel.some((user) => user.user.id === userId && user.isSpec);
//	}
}
