import { Module } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { PostsController } from './posts.controller.js';
import { PrismaService } from '../prisma.service.js';
import { R2Module } from '../common/r2/r2.module.js';

@Module({
  imports: [R2Module],
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule { }
