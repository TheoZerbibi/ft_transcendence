import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

export class RedisIoAdapter extends IoAdapter {
	private adapterConstructor: ReturnType<typeof createAdapter>;

	constructor(
		app,
		private readonly config: ConfigService,
	) {
		super(app);
	}

	async connectToRedis(): Promise<void> {
		const pubClient = createClient({
			socket: {
				host: this.config.get('REDIS_HOST'),
				port: this.config.get<number>('REDIS_PORT'),
			},
			password: this.config.get('REDIS_PASS'),
		});
		pubClient.on('error', (err) => {
			console.error('Erreur Redis:', err);
		});

		pubClient.on('connect', () => {
			console.log('Redis connecté');
		});
		const subClient = pubClient.duplicate();

		subClient.on('error', (err) => {
			console.error('Erreur Redis:', err);
		});

		subClient.on('connect', () => {
			console.log('Redis connecté');
		});

		await Promise.all([pubClient.connect(), subClient.connect()]);

		this.adapterConstructor = createAdapter(pubClient, subClient);
	}

	createIOServer(port: number, options?: ServerOptions): any {
		const server = super.createIOServer(port, options);
		server.adapter(this.adapterConstructor);
		return server;
	}
}
