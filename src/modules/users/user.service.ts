import { UserRepository } from "./user.repository.js";

export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async getAllUsers() {
    return (await this.userRepository.findAll());
  }
}

