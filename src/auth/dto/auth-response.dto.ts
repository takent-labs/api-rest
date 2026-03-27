import { ApiProperty } from '@nestjs/swagger';

export class UserPayloadDto {
  @ApiProperty({ description: 'ID único del usuario', example: 'cuid_abc123' })
  id: string;

  @ApiProperty({ description: 'Nombre de usuario', example: 'johndoe' })
  username: string;

  @ApiProperty({ description: 'Correo electrónico', example: 'usuario@ejemplo.com' })
  email: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'Token JWT de acceso para autenticar futuras peticiones',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({ description: 'Datos básicos del usuario autenticado', type: UserPayloadDto })
  user: UserPayloadDto;
}