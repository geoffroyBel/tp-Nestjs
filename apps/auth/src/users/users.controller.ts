import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { currentUser } from '../decorators/current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@currentUser() user: User) {
    return user;
  }
  @Post()
  async create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async find(@Param('id') id: string) {
    const { password, ...rest } = await this.usersService.findOne(Number(id));
    return rest;
  }
}
