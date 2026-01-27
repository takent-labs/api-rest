import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";
import { AppService } from "./app.service.js";
import { AppController } from "./app.controller.js";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
