import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { GameGateway } from 'src/gateway/game.gateway';
import { createAdapter } from '@socket.io/redis-adapter';
import { AuthService } from 'src/auth/auth.service';

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

		subClient.subscribe('new-connection');
		subClient.subscribe('JWT-auth');
		subClient.on('connect', () => {
			this.logger.log('Redis subClient connected');
		});

		subClient.on('message', (channel, message) => {
			if (channel === 'new-connection') this.app.get(GameGateway).handleRedisMessage(channel, message);
			if (channel === 'JWT-auth') this.app.get(AuthService).saveToken(JSON.parse(message));
		});
		this.adapterConstructor = createAdapter(pubClient, subClient);
	}

	createIOServer(port: number, options?: ServerOptions) {
		const server = super.createIOServer(port, options);
		server.adapter(this.adapterConstructor);
		return server;
	}
}
