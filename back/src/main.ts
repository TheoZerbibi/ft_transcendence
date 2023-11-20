import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { config } from './config/config';

async function bootstrap() {
	const appConfig = config().app;
	const port = appConfig.port;
	const app = await NestFactory.create(AppModule);
	const swaggerConfig = new DocumentBuilder()
		.setTitle('Transcendence - MEWO')
		.setDescription('Transcendence - API')
		.setVersion('1.0')
		.addTag('Transcendence', 'Pong')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				name: 'JWT',
				description: 'Enter JWT token',
				in: 'header',
			},
			'JWT-auth',
		)
		.build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('docs', app, document, {
		customCss: readFileSync('./swagger-ui/SwaggerDark.css', 'utf-8'),
	});
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	);
	app.enableCors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	});
	await app.listen(port | 3001);
}
bootstrap();
