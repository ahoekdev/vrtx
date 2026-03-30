import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTourDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID('4', { message: 'createdBy must be a UUID' })
  createdBy: string;
}
