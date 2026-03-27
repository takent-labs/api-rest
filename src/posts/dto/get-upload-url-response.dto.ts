import { ApiProperty } from '@nestjs/swagger';

export class GetUploadUrlResponseDto {
  @ApiProperty({
    description: 'URL prefirmada de Cloudflare R2 para subir el archivo directamente',
    example: 'https://r2.takent.app/upload?X-Amz-Signature=...',
  })
  uploadUrl: string;

  @ApiProperty({
    description: 'Nombre del archivo generado en el bucket de R2',
    example: 'cuid_abc123/posts/1700000000000-foto.jpg',
  })
  fileName: string;
}