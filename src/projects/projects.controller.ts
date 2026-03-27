import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({
    summary: 'Crear proyecto',
    description: 'Crea un nuevo proyecto en la plataforma.',
  })
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({ status: 201, description: 'Proyecto creado correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @ApiOperation({
    summary: 'Obtener todos los proyectos',
    description: 'Devuelve el listado completo de proyectos.',
  })
  @ApiResponse({ status: 200, description: 'Listado de proyectos.' })
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener proyecto por ID',
    description: 'Devuelve un proyecto concreto a partir de su ID numérico.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del proyecto', example: '1' })
  @ApiResponse({ status: 200, description: 'Proyecto encontrado.' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Actualizar proyecto',
    description: 'Actualiza parcialmente los datos de un proyecto existente.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del proyecto', example: '1' })
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({ status: 200, description: 'Proyecto actualizado correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @ApiOperation({
    summary: 'Eliminar proyecto',
    description: 'Elimina un proyecto existente de forma permanente.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del proyecto', example: '1' })
  @ApiResponse({ status: 200, description: 'Proyecto eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
