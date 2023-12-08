import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '@app/common/database/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const password = await bcrypt.hash(data.password, 10);
    return this.prismaService.user.create({ data: { ...data, password } });
  }

  async findOne(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  async verifyUser(email: string, password: string): Promise<any> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
    console.log(user);
    console.log(password);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Bad credentials');
    }
    return user;
  }
}
