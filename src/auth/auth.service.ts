import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { HashingService } from '../common/hashing/hashing.service.js';
import { SignUpDto } from './dto/sign-up.dto.js';
import { User } from 'src/users/entities/user.entity.js';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth-response.dto.js';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService
  ) { }

  async signIn(signInDto: SignInDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException("Email o contraseña incorrectos");
    }

    const isPasswordValid = await this.hashingService.compare(signInDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Email o contraseña incorrectos");
    }

    const { accessToken } = await this.generateToken(user);

    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<AuthResponseDto> {
    const user = await this.usersService.create(signUpDto);

    const { accessToken } = await this.generateToken(user)
    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  }

  private async generateToken(user: User): Promise<{ accessToken: string }> {

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email
    }

    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }
}
