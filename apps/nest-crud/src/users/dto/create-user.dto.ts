import { IsString, IsNumber, IsEmail } from 'class-validator';
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export class CreateUserDto {
  // @IsNumber() --joi validation done
  id: number;

  // @IsString()
  firstname: string;

  // @IsString()
  lastname: string;

  // @IsEmail()
  email: string;

  // @IsString()
  password: string;

  // @IsString()
  // role: Role;
}
