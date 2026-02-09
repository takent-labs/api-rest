import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('data')
  @UseGuards(AuthGuard)
  async getData(@Request() req) {
    const userId = req.user.sub;
    return await this.usersService.findOne(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }
}
