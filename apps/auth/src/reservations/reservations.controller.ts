import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, User } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { currentUser } from '../decorators/current-user.decorator';
import { ReservationGuard } from '../guards/reservationOwnerGward';
import { AdminGuard } from '../guards/admin-auth.guards';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(
      +createReservationDto.userId,
      +createReservationDto.productId,
    );
  }

  @Get()
  async findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }
  @UseGuards(JwtAuthGuard, ReservationGuard, AdminGuard)
  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @currentUser() user: User,
  ): Promise<void> {
    return this.reservationsService.delete(+id, user);
  }
}
