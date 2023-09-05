import { Module } from '@nestjs/common';
import { Gateway } from './gateway.websocket';

@Module({
	providers: [Gateway],
})
export class GatewayModule {

}

