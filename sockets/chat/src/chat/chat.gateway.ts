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
import { Chat, Channel, User, ChannelDto, UserDto } from './impl/Chat'
import { JwtGuard } from 'src/auth/guard';
import { users, channel_users } from '@prisma/client';
// import { direct_messages } from '@prisma/client';


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

//	Should register user using handle connection
//	Keeping it in failcase implementation of the feature in handleConnection
//
//
//	// Await for a stringified channel_users as body
//	@SubscribeMessage('new-connection')
//	public async connection(client: Socket, data: any) {
//		const user: any = JSON.parse(data);
//		const newUser: User = await this.chatService.registerUser(client, user.id);
//		const channels: Channel[] = newUser.getChannels();
//	
//		this.emitToChannels('new-connection', channels, user);
//	}

	// To_test
//	@SubscribeMessage('new-direct-message')
	public dirmsg(client: Socket, data: any): void
	{
		const msg:any = JSON.parse(data);
		const user: User | undefined = this.chatService.getUserById(msg.friend_id);

		if (user !== undefined) {
			user.getSocket().emit('new-direct-message', data);
		}
		else {
			console.info('Receiver of dir message is not connected');
		}
	}

	// To_test
//	@SubscribeMessage('new-channel-message')
	public msg(data: any): void
	{
		const msg: any = JSON.parse(data);
		const channel: Channel | undefined = this.chatService.getChannelById(msg.channel_id);

		if (channel === undefined)
			console.log('No one is connected to this channel atm');
		else
			this.emitToChannel('new-channel-message', channel, msg)
	}

	// transmit channelEntity data to everyone in the channel
//	@SubscribeMessage('channel-update')
	channelUpdate(data: any): void {
		const channelData: any = JSON.parse(data);
		const channelBuf: Channel = this.chatService.getChannelById(channelData.id);

		this.emitToChannel('channel-updated', channelBuf, channelData);
	}

//	@SubscribeMessage('channel-creation')
	channelCreation(data: any): void {
		const channelData: any = JSON.parse(data);
		const user: User | undefined = this.chatService.getUserById(channelData.users[0].user_id);
		let userSocket;

		this.chatService.addChannel(channelData.id, user);
		console.log(`New channel registered in socket with ${user}`);
		const { ['password']: excludedPassword, ...newChannel } = channelData;
		console.log('Sending these information to everyone connected to chat :');
		console.log(newChannel);
		if (user === undefined) {
			console.log('User who created channel is not connected');
			this.emitToEveryone('channel-creation', newChannel);
		}
		else {
			this.emitToEveryoneExceptOne('channel-creation', newChannel, user.getSocket());
		}
	}

//	@SubscribeMessage('channel-joined')
	channelJoined(data: any): void
	{
		const channel_user: channel_users = JSON.parse(data);
		console.log('Channel join event triggered');

		const channel: Channel = this.chatService.getChannelById(channel_user.channel_id);
		if (!channel) {
			console.error('Failure channel not found in memory');
			return;
		}

		const user: User = this.chatService.getUserById(channel_user.user_id);
		if (!user) {
			console.error('Failure user not found in memory');
			return;
		}

		channel.addUser(user);
		this.emitToChannel('channel-joined', channel, channel_user);
	}

	// Send to everyone in the channel of leaver, leaver information 
	// 'channel-quitted'
	public channelQuitted(data: any): void {
		const channel_user: any =  JSON.parse(data);
		const channel: Channel | undefined = this.chatService.removeUserFromChannelById(channel_user.user_id, channel_user.channel_id);

		if (channel === undefined) {
			console.info('No one is connected to this channel atm');
			return;
		}
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

	//----------------------  Deco/Connection handler ---------------------------------------------

	public async handleConnection(client: Socket): Promise<void> {
		try {
			if (!client.handshake.headers.authorization) throw new Error('Invalid token');
			const token = client.handshake.headers.authorization.replace(/Bearer /g, '');
			this.authService.verifyToken({ access_token: token });

		//	const user = client.handshake.user;
			return this.logger.debug(`Client connected: ${client.id}`);
		} catch (e) {
			client.emit('error', 'Invalid token');
			client.disconnect();
		}
	}

	public handleDisconnect(client: Socket): void {
		console.log('disconnect');
		const user: User = this.chatService.removeUser(client);

		const userDTOs: UserDto[] = this.chatService.getUsers().map((user) => new UserDto(user));

		this.emitToChannels('User-Disconnected', user.getChannels(), userDTOs);
		return this.logger.debug(`Client disconnected: ${client.id}`);
	}

	//----------------------  Emitting Function ------------------------------------

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

	private emitToEveryoneExceptOne(event: string, data: any, excludedClient: Socket)
	{
		this.server.emit(event, JSON.stringify(data), {except: excludedClient.id});
	}

	private emitToEveryone(event: string, data: any)
	{
		this.server.emit(event, JSON.stringify(data));
	}
}
