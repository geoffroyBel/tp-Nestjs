import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from '@app/common/database/prisma.service';
import { Reservation, User } from '@prisma/client';

@Injectable()
export class ReservationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, productId: number): Promise<Reservation> {
    return this.prismaService.reservation.create({
      data: { userId, productId },
    });
  }

  async findAll(): Promise<Reservation[]> {
    return this.prismaService.reservation.findMany();
  }

  async findOne(id: number): Promise<Reservation | null> {
    return this.prismaService.reservation.findFirst({
      where: { id },
    });
  }

  async delete(id: number, user: User): Promise<void> {
    await this.prismaService.reservation.delete({ where: { id } });
  }
}
