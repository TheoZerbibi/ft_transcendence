import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redis from 'redis';

@Injectable()
export class RedisService implements OnModuleDestroy {
	private redisClient: any;

	constructor(private config: ConfigService) {
		this.redisClient = redis.createClient({
			socket: {
				host: this.config.get('REDIS_HOST'),
				port: this.config.get<number>('REDIS_PORT'),
			},
			password: this.config.get('REDIS_PASS'),
		});

		this.redisClient.on('error', (err) => {
			console.error('Erreur Redis:', err);
		});

		this.redisClient.on('connect', () => {
			console.log('Redis connecté');
		});
	}

	async onModuleInit() {
		await this.redisClient.connect();
	}

	async onModuleDestroy() {
		await this.redisClient.quit();
	}

	async publish(channel: string, message: string) {
		await this.redisClient.publish(channel, message);
	}

	async connectClientToSocket(clientSocketId: string) {
		if (clientSocketId !== null && clientSocketId !== undefined)
			await this.redisClient.publish('events', clientSocketId.toString());
	}
}
