import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'Nombre de usuario único',
    example: 'johndoe',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'El nombre de usuario no puede exceder los 50 caracteres' })
  @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
  username: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'usuario@ejemplo.com',
    maxLength: 255,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255, { message: 'El correo no puede exceder los 255 caracteres' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'MiContraseña123',
    minLength: 8,
    maxLength: 128,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(128, { message: 'La contraseña no puede exceder los 128 caracteres' })
  password: string;

  @ApiPropertyOptional({
    description: 'Nombre del usuario',
    example: 'John',
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'El nombre no puede exceder los 50 caracteres' })
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Apellido del usuario',
    example: 'Doe',
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'El apellido no puede exceder los 50 caracteres' })
  lastName?: string;
}
