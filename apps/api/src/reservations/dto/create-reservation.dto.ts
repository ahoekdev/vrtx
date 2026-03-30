import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsUUID } from 'class-validator';

export class CreateReservationDto {
  @IsDateString({}, { message: 'date must be a valid ISO 8601 date string' })
  date: string;

  @Type(() => Boolean)
  @IsBoolean({ message: 'halfBoard must be a boolean' })
  halfBoard: boolean;

  @IsUUID('4', { message: 'bedId must be a UUID' })
  bedId: string;

  @IsUUID('4', { message: 'bookingId must be a UUID' })
  bookingId: string;
}
