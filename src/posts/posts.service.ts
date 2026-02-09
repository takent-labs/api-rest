import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { PrismaService } from '../prisma.service.js';
import { Post } from './entities/post.entity.js';

@Injectable()
export class PostsService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        userId
      }
    })
  }

  findAll() {
    return `This action returns all posts`;
  }

  findUserPosts(userId: string) {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
