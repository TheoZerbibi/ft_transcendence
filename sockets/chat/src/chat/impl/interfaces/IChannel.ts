import { IUser } from './IUser';
import { channel_messages, channel_users } from '@prisma/client';

export interface IChannel {
	users: Array<channel_users>;
	message: Array<channel_messages>;
}

export interface IChat {
	 channel_lst : Array<IChannel>;
	 user_lst: Array<IUser>;
}
