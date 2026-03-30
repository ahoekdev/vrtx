import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsUUID('4', { message: 'bookerId must be a UUID' })
  bookerId: string;

  @IsOptional()
  @IsString()
  comments?: string;
}
