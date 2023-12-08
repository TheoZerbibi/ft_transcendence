import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { createAdapter } from '@socket.io/redis-adapter';
import { ChatGateway } from 'src/chat/chat.gateway';

export class RedisIoAdapter extends IoAdapter {
	private readonly logger = new Logger(RedisIoAdapter.name);
	private adapterConstructor: ReturnType<typeof createAdapter>;

	constructor(
		private readonly app,
		private readonly config: ConfigService,
	) {
		super(app);
	}

	async connectToRedis() {
		const pubClient = new Redis({
			host: this.config.get('REDIS_HOST'),
			port: this.config.get<number>('REDIS_PORT'),
			password: this.config.get('REDIS_PASS'),
		});
		const subClient = pubClient.duplicate();

		//---------- Channel-user interaction
		subClient.subscribe('channel-creation');
		subClient.subscribe('channel-joined'); 
		subClient.subscribe('channel-quitted'); 
		subClient.subscribe('new-channel-message');
//		//---------- Direct message interaction
//		subClient.subscribe('new-direct-message');
//		//---------- Channel interaction
//		subClient.subscribe('channel-update');
//		subClient.subscribe('channel-deleted');
		subClient.on('connect', () => {
			this.logger.log('Redis subClient connected');
		});

		subClient.on('message', (channel, message) => {
			if (channel === 'channel-joined') this.app.get(ChatGateway).channelJoined(message);
			else if (channel === 'channel-creation') this.app.get(ChatGateway).channelCreation(message);
			else if (channel === 'channel-quitted') this.app.get(ChatGateway).channelQuitted(message);
			else if (channel === 'new-channel-message') this.app.get(ChatGateway).msg(message);
//			else if (channel === 'channel-joined') this.app.get(ChatGateway).ChannelJoined(message);
//			else if (channel === 'channel-joined') this.app.get(ChatGateway).ChannelJoined(message);
			console.log('Message received: ', channel, message);
		});
		this.adapterConstructor = createAdapter(pubClient, subClient);
	}

	createIOServer(port: number, options?: ServerOptions) {
		const server = super.createIOServer(port, options);
		server.adapter(this.adapterConstructor);
		return server;
	}
}
