import { Module } from '@nestjs/common';
import { Gateway } from './gateway.websocket';
import { EventsGateway } from './event.gateway';

@Module({
	providers: [Gateway, EventsGateway],
})
export class GatewayModule {}
