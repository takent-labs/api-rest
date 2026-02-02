import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { HashingService } from '../common/hashing/hashing.service.js';
import { SignUpDto } from './dto/sign-up.dto.js';
import { User } from 'src/users/entities/user.entity.js';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private readonly hashingService: HashingService) { }

  async signIn(signInDto: SignInDto): Promise<User> {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException("Email o contraseña incorrectos");
    }

    const isPasswordValid = await this.hashingService.compare(signInDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Email o contraseña incorrectos");
    }

    const { password, ...result } = user;

    return result;
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const newUser = await this.usersService.create(signUpDto);

    const { password, ...result} = newUser

    return result;
  }
}
