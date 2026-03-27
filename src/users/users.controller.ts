import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Obtener datos del usuario autenticado',
    description:
      'Devuelve el perfil completo del usuario autenticado a partir del token JWT. Incluye id, username, email, nombre, apellido, avatar y fechas de creación/actualización.',
  })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'Perfil del usuario autenticado.',
    schema: {
      example: {
        id: 'cuid_abc123',
        username: 'johndoe',
        email: 'usuario@ejemplo.com',
        firstName: 'John',
        lastName: 'Doe',
        imageUrl: 'https://cdn.takent.app/users/avatar.jpg',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T12:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'No autenticado. Token JWT requerido.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get('data')
  @UseGuards(AuthGuard)
  async getData(@Request() req) {
    const userId = req.user.sub;
    return await this.usersService.findOne(userId);
  }

  @ApiOperation({
    summary: 'Obtener perfil de un usuario por ID',
    description:
      'Devuelve el perfil público de un usuario a partir de su ID. No requiere autenticación.',
  })
  @ApiParam({ name: 'id', description: 'ID único del usuario', example: 'cuid_abc123' })
  @ApiResponse({
    status: 200,
    description: 'Perfil del usuario.',
    schema: {
      example: {
        id: 'cuid_abc123',
        username: 'johndoe',
        email: 'usuario@ejemplo.com',
        firstName: 'John',
        lastName: 'Doe',
        imageUrl: 'https://cdn.takent.app/users/avatar.jpg',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T12:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }
}
