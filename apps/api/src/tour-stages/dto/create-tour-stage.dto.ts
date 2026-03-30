import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateTourStageDto {
  @IsInt({ message: 'order must be an integer number' })
  @Min(0, { message: 'order must be greater than or equal to 0' })
  order: number;

  @IsUUID('4', { message: 'tourId must be a UUID' })
  tourId: string;

  @IsUUID('4', { message: 'stageId must be a UUID' })
  stageId: string;
}
