import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { PrismaService } from '../prisma.service.js';
import { Post } from './entities/post.entity.js';

@Injectable()
export class PostsService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        userId
      }
    })
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async findOne(id: string): Promise<Post> {

    const post = await this.prisma.post.findUnique({
      where: {
        id
      }
    })

    if (!post) throw new NotFoundException("El post no existe");

    return post;
  }

  async findUserPosts(userId: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        userId
      }
    });
  }

  async update(id: string, userId: string, updatePostDto: UpdatePostDto): Promise<Post> {

    const post = await this.findOne(id)

    if (post.userId !== userId) {
      throw new UnauthorizedException("No tienes permiso para editar este post");
    }

    return this.prisma.post.update({
      where: {
        id
      },
      data: updatePostDto
    })
  }

  async remove(id: string, userId: string): Promise<Post> {

    const post = await this.findOne(id)

    if (post.userId !== userId) {
      throw new UnauthorizedException("No tienes permiso para eliminar este post");
    }

    return this.prisma.post.delete({
      where: {
        id
      }
    })
  }
}
