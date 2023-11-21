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
import { IChannel } from './impl/interfaces/IChannel';
import { IUser } from './impl/interfaces/IUser';
import { JwtGuard } from 'src/auth/guard';
import { users } from '@prisma/client';

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

	@SubscribeMessage('connection')
	public async connection(client: Socket, data: any): Promise<void> {
		const userId: number = data;

		return await this.chatService.registerUser(client, userId);
	}

	@SubscribeMessage('channel-update')
	channelUpdate(client: Socket, data: any): void {
		// handle update from redis
		// Transmite data to user on same channel
	}

	@SubscribeMessage('message-posted')
	messagePosted(client: any, data: any)
	{
		//Handle new message posted should include Channel on which message are posted
	}

	@SubscribeMessage('channel-join')
	clientJoin(client: any, data: any)
	{
		// need to add client to internal channel for channel Update
	}

	public handleDisconnect(client: Socket): void {
		console.log('disconnect');
		this.chatService.removeUser(client);
		return this.logger.debug(`Client disconnected: ${client.id}`);
	}
	
//	Where should i use this ?
//	@UseGuards(JwtGuard)


	public afterInit() {
		return this.logger.log('Init');
	}



//	public handleRedisMessage(channel: string, message: any): void {
//		const data = JSON.parse(message);
//			console.log(data);
//			if (data.isEnded) this.gameService.createGame(data.gameUID, data.isEnded);
//			this.gameService.addWaitingConnection(data);
//			return this.logger.debug(`New redis-message, user ${data.userID} is waiting for game ${data.gameUID}`);
//		}
//	
//		private startGame(game: IGame): void {
//			game.startGame();
//			this.server.to(game.getGameUID()).emit('game_start', 'Game started');
//	
//			let countdown = 4;
//			const countdownInterval = setInterval(() => {
//				if (countdown > 0) {
//					this.server.to(game.getGameUID()).emit('countdown', countdown);
//					countdown--;
//				} else {
//					this.server.to(game.getGameUID()).emit('countdown', 0);
//					clearInterval(countdownInterval);
//				}
//			}, 1000);
//		}
}
