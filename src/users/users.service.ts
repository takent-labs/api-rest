import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma.service.js';
import { HashingService } from '../common/hashing/hashing.service.js';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService, private readonly hashingService: HashingService) { }

  private async validateUsername(username: string, excludeUserId?: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
        NOT: excludeUserId ? { id: excludeUserId } : undefined
      },
      select: { id: true }
    });

    if (user) throw new BadRequestException('El usuario ya está en uso');
  }

  private async validateEmail(email: string, excludeUserId?: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
        NOT: excludeUserId ? { id: excludeUserId } : undefined
      }
    });

    if (user) throw new BadRequestException('El correo ya está en uso');
  }

  async create(createUserDto: CreateUserDto) {
    await this.validateUsername(createUserDto.username);
    await this.validateEmail(createUserDto.email);

    const hashedPassword = await this.hashingService.hash(createUserDto.password);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword
      }
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) throw new NotFoundException("El usuario no existe");

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const currentUser = await this.findOne(id);

    if (updateUserDto.username && updateUserDto.username !== currentUser.username) {
      await this.validateUsername(updateUserDto.username, id);
    }

    if (updateUserDto.email && updateUserDto.email !== currentUser.email) {
      await this.validateEmail(updateUserDto.email, id);
    }

    const dataToUpdate = { ...updateUserDto };

    if (updateUserDto.password) {
      dataToUpdate.password = await this.hashingService.hash(updateUserDto.password);
    }

    return this.prisma.user.update({
      where: { id },
      data: dataToUpdate,
    })
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.user.delete({
      where: { id }
    })
  }
}
