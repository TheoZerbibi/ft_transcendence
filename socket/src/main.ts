import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis.adapter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = app.get(ConfigService);

	const redisIoAdapter = new RedisIoAdapter(app, config);
	await redisIoAdapter.connectToRedis();
	app.useWebSocketAdapter(redisIoAdapter);

	await app.listen(config.get<number>('PORT'));
}
bootstrap();
