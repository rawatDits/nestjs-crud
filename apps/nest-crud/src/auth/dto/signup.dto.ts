import { IsString, IsNumber, IsEmail } from 'class-validator';

export class SignupDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
