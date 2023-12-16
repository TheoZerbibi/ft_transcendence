import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';
import { OnlineService } from './online.service';
import { Socket, Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { users } from '@prisma/client';

@WebSocketGateway({
	cors: {
		origin: '*',
		credentials: true,
	},
	namespace: 'online',
})
export class OnlineGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private logger: Logger = new Logger('OnlineGateway');

	constructor(
		private authService: AuthService,
		private onlineService: OnlineService,
	) {}
	@WebSocketServer() server: Server;

	handleDisconnect(client: Socket | any): void {
		if (!client.handshake.headers.authorization) return;
		const token = client.handshake.headers.authorization.replace(/Bearer /g, '');
		const userID = this.authService.verifyToken({ access_token: token });
		if (!userID) return;
		this.onlineService.setUserOffline(userID);
	}

	async handleConnection(client: Socket): Promise<void> {
		try {
			if (!client.handshake.headers.authorization) throw new Error('Invalid token');
			const token = client.handshake.headers.authorization.replace(/Bearer /g, '');
			const userID = this.authService.verifyToken({ access_token: token });
			if (!userID) throw new Error('Invalid token');
			this.onlineService.setUserOnline(userID);
		} catch (e) {
			client.disconnect();
			return e;
		}
	}
}
