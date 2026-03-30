import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateStageDto {
  @IsUUID('4', { message: 'fromLodgeId must be a UUID' })
  fromLodgeId: string;

  @IsUUID('4', { message: 'toLodgeId must be a UUID' })
  toLodgeId: string;

  @IsInt({ message: 'duration must be an integer number' })
  @Min(0, { message: 'duration must be greater than or equal to 0' })
  duration: number;

  @IsInt({ message: 'distance must be an integer number' })
  @Min(0, { message: 'distance must be greater than or equal to 0' })
  distance: number;
}
