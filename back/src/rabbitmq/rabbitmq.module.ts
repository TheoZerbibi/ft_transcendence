import { Global, Module } from "@nestjs/common";
import { RabbitmqService } from "./rabbitmq.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Global()
@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'GREETING_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqp://norminet:FWEgwefp9@rabbitmq:5672'],
					queue: 'books_queue',
					queueOptions: {
						durable: false,
					},
				},
			},
		]),
	],
	providers: [RabbitmqService],
	exports: [RabbitmqService],
})
export class RabbitmqModule {}
