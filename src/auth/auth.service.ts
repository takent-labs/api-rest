import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { HashingService } from '../common/hashing/hashing.service.js';
import { SignUpDto } from './dto/sign-up.dto.js';
import { User } from 'src/users/entities/user.entity.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService
  ) { }

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException("Email o contraseña incorrectos");
    }

    const isPasswordValid = await this.hashingService.compare(signInDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Email o contraseña incorrectos");
    }

    return this.generateToken(user);
  }

  async signUp(signUpDto: SignUpDto): Promise<{ access_token: string }> {
    const newUser = await this.usersService.create(signUpDto);

    return this.generateToken(newUser);
  }

  private async generateToken(user: User): Promise<{ access_token: string }> {

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
