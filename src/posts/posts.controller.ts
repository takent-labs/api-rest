import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { PostsService } from './posts.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { PostResponseDto } from './dto/post-response.dto.js';
import { GetUploadUrlResponseDto } from './dto/get-upload-url-response.dto.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { GeneratePutUrlDto } from '../common/r2/dto/generate-put-url.dto.js';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: 'Crear publicación',
    description:
      'Crea una nueva publicación asociada al usuario autenticado. Requiere token JWT.',
  })
  @ApiBearerAuth('access-token')
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({
    status: 201,
    description: 'Publicación creada correctamente.',
    type: PostResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 401, description: 'No autenticado. Token JWT requerido.' })
  @Post()
  @UseGuards(AuthGuard)
  async create(@Request() req, @Body() createPostDto: CreatePostDto) {
    const userId = req.user.sub;
    return await this.postsService.create(createPostDto, userId);
  }

  @ApiOperation({
    summary: 'Obtener todas las publicaciones',
    description: 'Devuelve el listado completo de publicaciones de todos los usuarios.',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de publicaciones.',
    type: [PostResponseDto],
  })
  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener publicaciones de un usuario',
    description: 'Devuelve todas las publicaciones de un usuario concreto identificado por su ID.',
  })
  @ApiParam({ name: 'userId', description: 'ID único del usuario', example: 'cuid_abc123' })
  @ApiResponse({
    status: 200,
    description: 'Publicaciones del usuario.',
    type: [PostResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get('user/:userId')
  async findUserPosts(@Param('userId') userId: string) {
    return await this.postsService.findUserPosts(userId);
  }

  @ApiOperation({
    summary: 'Obtener URL prefirmada para subir imagen',
    description:
      'Genera una URL prefirmada de Cloudflare R2 para que el cliente suba directamente una imagen. Tras subir la imagen, usa el fileName devuelto como imageUrl al crear la publicación.',
  })
  @ApiBearerAuth('access-token')
  @ApiBody({ type: GeneratePutUrlDto })
  @ApiResponse({
    status: 201,
    description: 'URL de subida generada correctamente.',
    type: GetUploadUrlResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Tipo de archivo no permitido.' })
  @ApiResponse({ status: 401, description: 'No autenticado. Token JWT requerido.' })
  @Post('upload-url')
  @UseGuards(AuthGuard)
  async getUploadUrl(@Request() req, @Body() dto: GeneratePutUrlDto): Promise<GetUploadUrlResponseDto> {
    const userId = req.user.sub;
    return await this.postsService.getUploadUrl(dto, userId);
  }

  @ApiOperation({
    summary: 'Actualizar publicación',
    description:
      'Actualiza parcialmente una publicación existente. Solo el propietario de la publicación puede modificarla.',
  })
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'id', description: 'ID único de la publicación', example: 'cuid_post123' })
  @ApiBody({ type: UpdatePostDto })
  @ApiResponse({
    status: 200,
    description: 'Publicación actualizada correctamente.',
    type: PostResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 401, description: 'No autenticado. Token JWT requerido.' })
  @ApiResponse({ status: 403, description: 'No tienes permiso para modificar esta publicación.' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada.' })
  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Request() req, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const userId = req.user.sub;
    return await this.postsService.update(id, userId, updatePostDto);
  }

  @ApiOperation({
    summary: 'Eliminar publicación',
    description:
      'Elimina una publicación existente. Solo el propietario de la publicación puede eliminarla.',
  })
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'id', description: 'ID único de la publicación', example: 'cuid_post123' })
  @ApiResponse({ status: 200, description: 'Publicación eliminada correctamente.' })
  @ApiResponse({ status: 401, description: 'No autenticado. Token JWT requerido.' })
  @ApiResponse({ status: 403, description: 'No tienes permiso para eliminar esta publicación.' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada.' })
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Request() req, @Param('id') id: string) {
    const userId = req.user.sub;
    return await this.postsService.remove(id, userId);
  }
}
