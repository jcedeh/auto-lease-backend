import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from "class-validator";
import type { UserRole } from "../users/user-role.enum.js";

export class RegisterUserDto {

  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  email!: string;

  @MinLength(8)
  password!: string;

  @IsOptional()
  role?: UserRole
}

export class LoginUserDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
} 
