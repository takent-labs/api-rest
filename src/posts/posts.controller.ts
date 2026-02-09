import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Request() req, @Body() createPostDto: CreatePostDto) {
    const userId = req.user.sub;
    return await this.postsService.create(createPostDto, userId);
  }

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get('user/:userId')
  async findUserPosts(@Param('userId') userId: string) {
    return await this.postsService.findUserPosts(userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Request() req, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const userId = req.user.sub;
    return await this.postsService.update(id, userId, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Request() req, @Param('id') id: string) {
    const userId = req.user.sub;
    return await this.postsService.remove(id, userId);
  }
}
