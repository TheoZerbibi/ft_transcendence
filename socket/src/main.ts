import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis-io.adapter';
import * as dotenv from 'dotenv';

async function bootstrap() {
	dotenv.config({ path: '/.env' });

	const app = await NestFactory.create(AppModule);

	const redisIoAdapter = new RedisIoAdapter(app);
	await redisIoAdapter.connectToRedis();
	app.useWebSocketAdapter(redisIoAdapter);

	await app.listen(4000);
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
