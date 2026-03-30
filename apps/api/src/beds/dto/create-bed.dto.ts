import { IsIn, IsInt, IsUUID, Min } from 'class-validator';

const bedPlacements = ['start', 'between', 'end'] as const;

type BedPlacement = (typeof bedPlacements)[number];

export class CreateBedDto {
  @IsInt({ message: 'order must be an integer number' })
  @Min(0, { message: 'order must be greater than or equal to 0' })
  order: number;

  @IsIn(bedPlacements, {
    message: `placement must be one of: ${bedPlacements.join(', ')}`,
  })
  placement: BedPlacement;

  @IsUUID('4', { message: 'roomId must be a UUID' })
  roomId: string;
}
