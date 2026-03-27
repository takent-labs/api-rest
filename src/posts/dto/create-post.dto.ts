import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Contenido textual de la publicación',
    example: 'Esta es mi primera publicación en Takent! #takent #dev',
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000, { message: 'El contenido no puede exceder los 1000 caracteres' })
  content: string;

  @ApiPropertyOptional({
    description: 'Lista de hashtags asociados a la publicación',
    example: ['takent', 'dev', 'opensource'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hashtags?: string[];

  @ApiPropertyOptional({
    description: 'URL de la imagen adjunta a la publicación (generada por el endpoint upload-url)',
    example: 'https://cdn.takent.app/posts/imagen.jpg',
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000, { message: 'La URL de la imagen no puede exceder los 1000 caracteres' })
  imageUrl?: string;
}
