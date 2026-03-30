import { Type } from 'class-transformer';
import { IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'price must be a number' })
  @Min(0, { message: 'price must be greater than or equal to 0' })
  price: number;

  @IsUUID('4', { message: 'lodgeId must be a UUID' })
  lodgeId: string;
}
