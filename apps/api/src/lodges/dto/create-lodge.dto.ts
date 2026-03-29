import { IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';

const alpineCountryCodes = ['AT', 'CH', 'DE', 'FR', 'IT', 'LI', 'SI'] as const;

type AlpineCountryCode = (typeof alpineCountryCodes)[number];

export class CreateLodgeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn(alpineCountryCodes, {
    message: `country must be one of: ${alpineCountryCodes.join(', ')}`,
  })
  country: AlpineCountryCode;

  @IsUUID('4', { message: 'keeperId must be a UUID' })
  keeperId: string;
}
