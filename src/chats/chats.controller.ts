import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ChatsService } from './chats.service.js';
import { CreateChatDto } from './dto/create-chat.dto.js';
import { UpdateChatDto } from './dto/update-chat.dto.js';

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @ApiOperation({
    summary: 'Crear chat',
    description: 'Crea un nuevo chat entre usuarios.',
  })
  @ApiBody({ type: CreateChatDto })
  @ApiResponse({ status: 201, description: 'Chat creado correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @ApiOperation({
    summary: 'Obtener todos los chats',
    description: 'Devuelve el listado completo de chats existentes.',
  })
  @ApiResponse({ status: 200, description: 'Listado de chats.' })
  @Get()
  findAll() {
    return this.chatsService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener chat por ID',
    description: 'Devuelve un chat concreto a partir de su ID numérico.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del chat', example: '1' })
  @ApiResponse({ status: 200, description: 'Chat encontrado.' })
  @ApiResponse({ status: 404, description: 'Chat no encontrado.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Actualizar chat',
    description: 'Actualiza parcialmente los datos de un chat existente.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del chat', example: '1' })
  @ApiBody({ type: UpdateChatDto })
  @ApiResponse({ status: 200, description: 'Chat actualizado correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 404, description: 'Chat no encontrado.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(+id, updateChatDto);
  }

  @ApiOperation({
    summary: 'Eliminar chat',
    description: 'Elimina un chat existente de forma permanente.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del chat', example: '1' })
  @ApiResponse({ status: 200, description: 'Chat eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Chat no encontrado.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(+id);
  }
}
