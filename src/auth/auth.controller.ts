import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { SignUpDto } from './dto/sign-up.dto.js';
import { AuthResponseDto } from './dto/auth-response.dto.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Autentica al usuario con su correo y contraseña. Devuelve un token JWT de acceso y los datos básicos del usuario.',
  })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 200,
    description: 'Autenticación exitosa. Devuelve el token JWT y datos del usuario.',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @ApiOperation({
    summary: 'Registrar nuevo usuario',
    description:
      'Crea una nueva cuenta de usuario en la plataforma. El username y el email deben ser únicos.',
  })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente. Devuelve el token JWT y datos del usuario.',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o el username/email ya están en uso.',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(@Body() SignUpDto: SignUpDto) {
    return await this.authService.signUp(SignUpDto);
  }
}