import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	providers: [UserService],
<<<<<<< HEAD
<<<<<<< HEAD
	exports: [UserService],
=======
>>>>>>> c80165e (fix: github issue)
=======
	exports: [UserService],
>>>>>>> 977cbef (fix: Fix for rebase)
})
export class UserModule {}
