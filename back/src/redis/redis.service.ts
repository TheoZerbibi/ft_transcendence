import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redis from 'redis';
import { Logger } from '@nestjs/common';

@Injectable()
export class RedisService implements OnModuleDestroy {
	private redisClient: any;
	private readonly logger = new Logger(RedisService.name);

	constructor(private config: ConfigService) {}

	async onModuleInit() {
		this.redisClient = redis.createClient({
			socket: {
				host: this.config.get('REDIS_HOST'),
				port: this.config.get<number>('REDIS_PORT'),
			},
			password: this.config.get('REDIS_PASS'),
		});

		this.redisClient.on('error', (err) => {
			this.logger.log('Erreur Redis:', err);
		});

		this.redisClient.on('connect', () => {
			this.logger.log('Redis connecté');
		});
		await this.redisClient.connect();
	}

	async onModuleDestroy() {
		await this.redisClient.quit();
	}

	async publish(channel: string, message: string) {
		await this.redisClient.publish(channel, message);
	}

<<<<<<< HEAD
	async connectClientToSocket(gameID: number, gameUID: string, userID: number, isSpec: boolean, isEnded: boolean) {
		if (gameUID !== null && gameUID !== undefined)
			await this.redisClient.publish(
				'new-connection',
				JSON.stringify({ gameID, gameUID: gameUID, userID: userID, isSpec: isSpec, isEnded: isEnded }),
=======
	async connectClientToSocket(gameUID: string, userID: number, isSpec: boolean, isEnded: boolean) {
		if (gameUID !== null && gameUID !== undefined)
			await this.redisClient.publish(
				'new-connection',
				JSON.stringify({ gameUID: gameUID, userID: userID, isSpec: isSpec, isEnded: isEnded }),
>>>>>>> c80165e (fix: github issue)
			);
	}
}
