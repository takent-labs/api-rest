import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthorDto {
  @ApiProperty({ description: 'ID único del autor', example: 'cuid_abc123' })
  id: string;

  @ApiProperty({ description: 'Nombre de usuario del autor', example: 'johndoe' })
  username: string;

  @ApiPropertyOptional({
    description: 'URL del avatar del autor',
    example: 'https://cdn.takent.app/users/avatar.jpg',
    nullable: true,
  })
  imageUrl: string | null;
}

export class PostResponseDto {
  @ApiProperty({ description: 'Datos del autor de la publicación', type: AuthorDto })
  user: AuthorDto;

  @ApiProperty({ description: 'ID único de la publicación', example: 'cuid_post123' })
  id: string;

  @ApiProperty({ description: 'ID del usuario propietario', example: 'cuid_abc123' })
  userId: string;

  @ApiProperty({
    description: 'Contenido textual de la publicación',
    example: 'Esta es mi primera publicación en Takent!',
  })
  content: string;

  @ApiPropertyOptional({
    description: 'Lista de hashtags de la publicación',
    example: ['takent', 'dev'],
    type: [String],
  })
  hashtags?: string[];

  @ApiPropertyOptional({
    description: 'URL de la imagen adjunta',
    example: 'https://cdn.takent.app/posts/imagen.jpg',
    nullable: true,
  })
  imageUrl?: string | null;

  @ApiProperty({ description: 'Fecha de creación', example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización', example: '2024-01-15T12:00:00.000Z' })
  updatedAt: Date;
}