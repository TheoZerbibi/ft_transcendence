import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	providers: [UserService],
<<<<<<< HEAD
	exports: [UserService],
=======
>>>>>>> c80165e (fix: github issue)
})
export class UserModule {}
