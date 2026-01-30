import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";
import { AuthModule } from './auth/auth.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { UsersModule } from './users/users.module.js';
import { PostsModule } from './posts/posts.module.js';
import { ChatsModule } from './chats/chats.module.js';

@Module({
  imports: [AuthModule, ProjectsModule, UsersModule, PostsModule, ChatsModule],
  providers: [PrismaService],
})

export class AppModule { }
