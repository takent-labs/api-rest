import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { PrismaService } from '../prisma.service.js';
import { Post } from './entities/post.entity.js';
import { PostResponseDto } from './dto/post-response.dto.js';
import { R2Service } from '../common/r2/r2.service.js';
import { GeneratePutUrlDto } from '../common/r2/dto/generate-put-url.dto.js';
import { GetUploadUrlResponseDto } from './dto/get-upload-url-response.dto.js';

@Injectable()
export class PostsService {

  constructor(private readonly prisma: PrismaService, private readonly r2Service: R2Service) { }

  async getUploadUrl(dto: GeneratePutUrlDto, userId: string): Promise<GetUploadUrlResponseDto> {

    const fileExtension = dto.fileName.split('.').pop();
    const uniqueId = crypto.randomUUID();
    const fileName = `posts/users/${userId}/${uniqueId}.${fileExtension}`;

    const uploadUrl = await this.r2Service.generatePutUrl({
      ...dto,
      fileName
    });

    return {
      uploadUrl,
      fileName
    }
  }

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const { hashtags, ...data } = createPostDto;

    return await this.prisma.post.create({
      data: {
        ...data,
        userId,
        postHashtags: {
          create: hashtags?.map(hashtag => ({
            hashtag: {
              connectOrCreate: {
                where: { name: hashtag.replace('#', '').toLowerCase() },
                create: { name: hashtag.replace('#', '').toLowerCase() }
              }
            }
          }))
        }
      }
    })
  }

  async findAll(): Promise<PostResponseDto[]> {
    const postsArray = await this.prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            imageUrl: true
          }
        },
        postHashtags: {
          include: {
            hashtag: true
          }
        }
      }
    });

    const posts = postsArray.map(post => {
      const { postHashtags, ...data } = post;
      return {
        ...data,
        hashtags: postHashtags.map(ph => ph.hashtag.name)
      };
    })

    return posts;
  }

  async findOne(id: string): Promise<PostResponseDto> {

    const post = await this.prisma.post.findUnique({
      where: {
        id
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            imageUrl: true
          }
        },
        postHashtags: {
          include: {
            hashtag: true
          }
        }
      }
    })

    if (!post) throw new NotFoundException("El post no existe");

    const { postHashtags, ...data } = post;

    return {
      ...data,
      hashtags: postHashtags.map(ph => ph.hashtag.name)
    };
  }

  async findUserPosts(userId: string): Promise<PostResponseDto[]> {
    const postsArray = await this.prisma.post.findMany({
      where: {
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            imageUrl: true
          }
        },
        postHashtags: {
          include: {
            hashtag: true
          }
        }
      }
    });

    const posts = postsArray.map(post => {
      const { postHashtags, ...data } = post;
      return {
        ...data,
        hashtags: postHashtags.map(ph => ph.hashtag.name)
      };
    })

    return posts;
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
