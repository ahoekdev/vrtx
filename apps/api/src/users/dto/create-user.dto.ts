import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;
}
