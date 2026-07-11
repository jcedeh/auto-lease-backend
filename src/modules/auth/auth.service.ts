import { UserRepository } from "../users/user.repository.js";
import { RegisterUserDto } from "./auth.dto.js";
import { AppError } from "../../errors/AppError.js";
import { HTTP_STATUS } from "../../constants/http-status.js";
import { hashPassword } from "../../utils/hash.js";
import { User } from "../users/user.entity.js";
import { UserRole } from "../users/user-role.enum.js";
import { LoginUserDto } from "./auth.dto.js";
import { comparePassword } from "../../utils/hash.js";
import {generateToken} from "../../utils/jwt.js";


export class AuthService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async register(dto: RegisterUserDto) {

    // check if the email already exists in the database
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) { 
        throw new AppError("Email already exists", HTTP_STATUS.CONFLICT);}
    
    //hash the password before saving it to the database
    const hashedPassword = await hashPassword(dto.password);

    //create a new user entity and save it to the database
    const user = await this.userRepository.createUser({
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    password: hashedPassword,
    role: UserRole.CUSTOMER,
});
console.log(user)
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    
  }

async login(dto: LoginUserDto) {
  const user = await this.userRepository.findByEmail(dto.email);
  if (!user) {
    throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
  }
  //compare passwords
  const isMatch = await comparePassword(dto.password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
  }
  const token = await generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  return {
    token,
    user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
    },
  }
}

}