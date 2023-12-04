import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
	ConnectedSocket,
	MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ChatService } from './chat.service';
import { Chat, Channel, User } from './impl/Chat'
import { JwtGuard } from 'src/auth/guard';
import { users, channel_users } from '@prisma/client';
// import { direct_messages } from '@prisma/client';

@WebSocketGateway({
	cors: {
		origin: '*',
		credentials: true,
	},
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private logger: Logger = new Logger('GameGateway');

	constructor(
		private authService: AuthService,
		private chatService: ChatService,
	) {}

	@WebSocketServer() server: Server;



	public async handleConnection(client: Socket): Promise<void> {
		try {
			if (!client.handshake.headers.authorization) throw new Error('Invalid token');
			const token = client.handshake.headers.authorization.replace(/Bearer /g, '');
			this.authService.verifyToken({ access_token: token });
	
			return this.logger.debug(`Client connected: ${client.id}`);
		} catch (e) {
			client.emit('error', 'Invalid token');
			client.disconnect();
		}
	}

	// Await for a stringified channel_users as body
	@SubscribeMessage('new-connection')
	public async connection(client: Socket, data: any) {
		const user: any = JSON.parse(data);
		const newUser: User = await this.chatService.registerUser(client, user.id);
		const channels: Channel[] = newUser.getChannels();
	
		this.emitToChannels('new-connection', channels, user);
	}

	@SubscribeMessage('new-direct-message')
	public dirmsg(client: Socket, data: any): void
	{
		const msg:any = JSON.parse(data);
		const user: User | undefined = this.chatService.getUserById(msg.friend_id);

		if (user  !== undefined) {
			user.getSocket().emit('new-direct-msg', data);
		}
	}

	// transmit channelEntity data to everyone in the channel
	@SubscribeMessage('channel-update')
	channelUpdate(client: Socket, data: any): void {

		const channelData: any = JSON.parse(data);
		const channelBuf: Channel = this.chatService.getChannelById(channelData.id);

		this.emitToChannel('channel-updated', channelBuf, channelData);
	}

	@SubscribeMessage('new-channel-user')
	newChannelUser(client: Socket, data: any): void
	{
		const channel_user: channel_users = JSON.parse(data);
		console.log('Channel join event triggered');
		const channel: Channel = this.chatService.getChannelById(channel_user.channel_id);
		if (!channel) {
			console.log('Failure channel not found in memory');
			return;
		}
		const user: User = this.chatService.getUserById(channel_user.user_id);
		if (!user) {
			console.log('Failure user not found in memory');
			return;
		}


		this.emitToChannel('channel-user', channel, channel_user);
		channel.addUser(user);
		console.log ('Channel join event resolved');
	}

	public handleDisconnect(client: Socket): void {
		console.log('disconnect');
		this.chatService.removeUser(client);
		return this.logger.debug(`Client disconnected: ${client.id}`);
	}

	private emitToChannel(event: string, channel: Channel, data: any)
	{
		console.log('emitting to channel ' + channel.getId);
		const chatUsers = channel.getUsers();

		for (let i = 0; i < chatUsers.length; i++)
		{
			chatUsers[i].getSocket().emit(event, JSON.stringify(data));
		}
	}

	private emitToChannels(event: string, channels: Channel[], data: any)
	{
		for (let i = 0; i < channels.length; i++)
		{
			this.emitToChannel(event, channels[i], data);
		}
	}
}
