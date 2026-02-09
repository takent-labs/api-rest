import 'dotenv/config'
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { HashingModule } from '../common/hashing/hashing.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    HashingModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      //TODO cambiar duración en producción
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
