import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import {} from '../auth.service';

export class JwtGuard extends AuthGuard('jwt') {
	constructor() {
		super();
	}

	getRequest(context: ExecutionContext) {
		const ctx = context.switchToHttp().getRequest();
		return ctx.handshake;
	}
}
