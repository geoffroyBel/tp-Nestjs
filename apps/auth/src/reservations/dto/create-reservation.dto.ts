import { IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  productId: string;
  @IsString()
  userId: string;
}
