import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class GeneratePutUrlDto {
  @ApiProperty({
    description: 'Nombre del archivo a subir (se recomienda incluir extensión)',
    example: 'foto-perfil.jpg',
  })
  @IsString()
  fileName: string;

  @ApiProperty({
    description: 'Tipo MIME del archivo. Solo se permiten imágenes JPG o PNG',
    example: 'image/jpeg',
    enum: ['image/jpeg', 'image/png'],
  })
  @IsIn(['image/jpeg', 'image/png'], {
    message: 'Solo se permiten imágenes JPG o PNG',
  })
  contentType: string;
}