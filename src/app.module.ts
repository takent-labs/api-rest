import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";
import { AuthModule } from './auth/auth.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { UsersModule } from './users/users.module.js';
import { PostsModule } from './posts/posts.module.js';
import { ChatsModule } from './chats/chats.module.js';
import { HashingModule } from './common/hashing/hashing.module.js';
import { HashingService } from './common/hashing/hashing.service.js';
import { R2Module } from './common/r2/r2.module.js';
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [AuthModule, ProjectsModule, UsersModule, PostsModule, ChatsModule, HashingModule, R2Module,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
  ],
  providers: [PrismaService, HashingService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})

export class AppModule { }
