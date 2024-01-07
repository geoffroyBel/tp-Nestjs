import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { log } from 'console';
import { Observable } from 'rxjs';
import { ReservationsService } from '../reservations/reservations.service';
@Injectable()
export class ReservationGuard implements CanActivate {
  constructor(private readonly reservationService: ReservationsService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const reservationId = request.params.id;
    const userId = request.user.id;
    const isAdmin = request.user.admin;

    const reservation = await this.reservationService.findOne(+reservationId);

    if (!reservation) {
      throw new NotFoundException('No reservation for that id');
    }

    if (reservation.userId !== userId && !isAdmin) {
      throw new ForbiddenException('vous n etse pas autoriser');
    }

    return true;
  }
}
