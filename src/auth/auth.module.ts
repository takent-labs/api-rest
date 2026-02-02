import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { HashingModule } from '../common/hashing/hashing.module.js';

@Module({
  imports: [UsersModule, HashingModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
