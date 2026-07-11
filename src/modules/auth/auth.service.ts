import { UserRepository } from "../users/user.repository.js";
import { RegisterUserDto } from "./auth.dto.js";
import { AppError } from "../../errors/AppError.js";
import { HTTP_STATUS } from "../../constants/http-status.js";
import { hashPassword } from "../../utils/hash.js";
import { User } from "../users/user.entity.js";
import { UserRole } from "../users/user-role.enum.js";


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
    const user = this.userRepository.createUser({
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    password: hashedPassword,
    role: UserRole.CUSTOMER,
});

    return user;
}


}