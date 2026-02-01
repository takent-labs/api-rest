import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma.service.js';
import { HashingService } from '../common/hashing/hashing.service.js';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService, private readonly hashingService: HashingService) { }

  private async validateUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
      select: { username: true }
    })
    
    if (!user) return;

    throw new BadRequestException('El usuario ya está en uso');
  }

  private async validateEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      select: { email: true }
    })

    if (!user) return;

    throw new BadRequestException('El correo ya está en uso');
  }

  async create(createUserDto: CreateUserDto) {
    await this.validateUsername(createUserDto.username);
    await this.validateEmail(createUserDto.email);

    const hasshedPassword = await this.hashingService.hash(createUserDto.password);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hasshedPassword
      }
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
