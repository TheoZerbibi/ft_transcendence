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
import { Chat } from './impl/Chat'
import { Channel, User, ChannelDto, UserDto } from './impl/Channel'
import { JwtGuard } from 'src/auth/guard';
import { users, channel_users } from '@prisma/client';
import { ForbiddenException } from '@nestjs/common';


// Gateway emit mostly the data he received in the case of message, new user_channel or channel-update event
//
// Else it will return ChannelDto which hold list of users_id connected to the channel
//
// Since Front never make direct call to socket function don't return data

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

	//----------------------  Deco/Connection handler ---------------------------------------------

	public async handleConnection(client: Socket): Promise<void> {
		try {
			if (!client.handshake.headers.authorization) throw new Error('Invalid token');
			const token = client.handshake.headers.authorization.replace(/Bearer /g, '');
			this.authService.verifyToken({ access_token: token });
			const user: users = await this.authService.getUser(token);

			if (user === undefined) throw new ForbiddenException('Invalid token');

			this.chatService.addUser(client, user);
			this.logger.debug(`Client connected: socket:${client.id}, usr_.id:${user.id}`);

			const users_lst: UserDto[] = this.chatService.getUserDtos();

			const channelDtos: ChannelDto[] = this.chatService.getChannelDtos();
			client.emit('welcome', JSON.stringify(users_lst));
			this.emitToEveryoneExceptOne('new-connection', user.login, client);

		} catch (e) {
			client.emit('error', 'Invalid token');
			client.disconnect();
		}
	}

	public async handleDisconnect(client: Socket): Promise<void> {
		this.logger.debug(`[Disconnection] client id: ${client.id}`);

		const token = client.handshake.headers.authorization.replace(/Bearer /g, '');
		const  user: users = await this.authService.getUser(token);
		const userDtos: UserDto[] = this.chatService.getUserDtos();
		this.chatService.removeUser(user);
		this.emitToEveryone('user-disconnected', JSON.stringify(userDtos));
		this.logger.debug(`Client disconnected: user.id:${user.id}`);
	}

	//-----------------Api to front routes--------------------

	//	@SubscribeMessage('new-direct-message')
	public dirmsg(data: any): void
	{

		const msg = JSON.parse(data);
		const user: User | undefined = this.chatService.getUserById(msg.friend_id);
		const me: User | undefined = this.chatService.getUserById(msg.user_id);

		const { ['user_login']: user_login, ...newMsg } = msg;
		const { ['target_login']: target_login, ...newMsg2 } =newMsg;

		this.logger.debug(`'new-direct-message': ${(data)}`);

		if (user !== undefined && user_login === user.getUserOn())
			this.server.to(user.getSocket().id).emit('new-direct-message', JSON.stringify(newMsg2));
		if (me !== undefined && target_login === me.getUserOn()) 
			this.server.to(me.getSocket().id).emit('new-direct-message', JSON.stringify(newMsg2));
	}

	//	@SubscribeMessage('new-channel-message')
	public msg(data: any): void
	{
		const msg: any = JSON.parse(data);
		const users: User[] = this.chatService.getUsers();

		const target: User[] = users.filter((user) => user.getChannelOn() === msg.channelName);

		this.logger.debug(`[ChanMsg] received for ${msg.channelName}`);

		const { ['channelName']: channelName, ...newMsg } = msg;
		const { ['channel_id']: channel_id, ...newMsg2 } = newMsg;


		if (target !== undefined) {
			target.map((user) => {
				user.getSocket().emit('new-channel-message', newMsg2);
			});
		}
	}

	//	transmit channelEntity data to everyone in the channel
	//	@SubscribeMessage('channel-update')
	channelUpdate(data: any): void {
		const channelData: any = JSON.parse(data);
		const channelBuf: Channel | undefined = this.chatService.getChannelById(channelData.id);

		const { ['password']: excludedPassword, ...newChannel } = channelData;

		if (channelData.public)
			this.emitToEveryone('channel-updated', newChannel);
		else if (channelBuf !== undefined)
			this.emitToChannel('channel-updated', channelBuf, newChannel);
	}

	userUpdate(data: any): void {
		const channelUser: any = JSON.parse(data);
		const channelBuf: Channel | undefined = this.chatService.getChannelById(channelUser.channel_id);

		if (channelBuf !== undefined) {
			this.emitToChannel('channel-user-update', channelBuf, channelUser);
		}
	}

	@SubscribeMessage('channel-selected')
	channelSelected(client: Socket, data: any): void {
			const channel = data;
			
			this.chatService.selectChannel(client, data);
	}

	@SubscribeMessage('user-selected')
	userSelected(client: Socket, data: any): void {
			const user_login = data;
			
			this.chatService.selectUser(client, data);
	}

//	May Be useful
//	  @SubscribeMessage('channel-deselected')
//	  channelDeselected(client: Socket, data: any): void {
//	  }


	//		@SubscribeMessage('channel-creation')
	channelCreation(data: any): void {
		let userSocket;
		const channelData: any = JSON.parse(data);
		const user: User | undefined = this.chatService.getUserById(channelData.users[0].user_id);

		this.chatService.addChannel(channelData.id, user);
		const { ['password']: excludedPassword, ...newChannel } = channelData;
		if (user === undefined) {
			this.emitToEveryone('channel-creation', newChannel);
		}
		else {
			this.emitToEveryoneExceptOne('channel-creation', newChannel, user.getSocket());
		}
	}

	//	'channel-joined'
	channelJoined(data: any): void
	{
		const channel_user: channel_users = JSON.parse(data);

		const user: User = this.chatService.getUserById(channel_user.user_id);

		if (!user) {
			console.error('Failure user not found in memory');
			return;
		}

		let channel: Channel | undefined = this.chatService.getChannelById(channel_user.channel_id);
		if (channel === undefined) {
			channel = this.chatService.addChannel(channel_user.channel_id, user);
		}
		channel.addUser(user);
		this.emitToChannel('channel-joined', channel, channel_user);
	}

	// Send to everyone in the channel of leaver, leaver information 
	// need to rework emit (should send the channel_user who got removed)
	// 'channel-quitted'
	public channelQuitted(data: any): void {
		const channel_user: any =  JSON.parse(data);
		const channel: Channel | undefined = this.chatService.removeUserFromChannelById(channel_user.user_id, channel_user.channel_id);

		if (channel === undefined)
			console.info('No one is connected to this channel atm');
		else
			this.emitToChannel('user-quitted-channel', channel, JSON.stringify(new ChannelDto(channel)));
	}

	// 'channel-deleted'
	public channelDeleted(data: any): void
	{
		const channelEntity: any = JSON.parse(data);
		const channel: Channel = this.chatService.deleteChannel(channelEntity);

		if (!channel) {
			console.info('No one is connected to this channel atm');
		}
		const { ['password']: excludedPassword, ...tmpChannel } = channelEntity;
		const { ['users']: excludedUsers, ...channelReturned } = tmpChannel;
		this.emitToEveryone('channel-deleted', JSON.stringify(channelReturned));
	}

	//----------------------  Emitting Function ------------------------------------

	private emitToChannel(event: string, channel: Channel, data: any)
	{
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

	private	emitWrap(client: Socket, event: string, data : any)
	{
		const jsoned = JSON.stringify(data);

	//	this.logger.debug(`>Emitting to client id ${client.id} data: ${jsoned}`);
		this.server.emit(event, jsoned);
	}

	private emitToEveryoneExceptOne(event: string, data: any, excludedClient: Socket)
	{
		const jsoned = JSON.stringify(data);

	//	this.logger.debug(`>Emitting to everyconnected client data: ${jsoned}`);
		this.server.emit(event, JSON.stringify(data), {except: excludedClient.id});
	}

	private emitToEveryone(event: string, data: any)
	{
		const jsoned = JSON.stringify(data);

	//	this.logger.debug(`>Emitting to everyconnected client data: ${jsoned}`);
		this.server.emit(event, JSON.stringify(data));
	}
}
