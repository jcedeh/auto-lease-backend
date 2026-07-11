import { UserRepository } from "./user.repository.js";

export class UserService {
  async getAllUsers() {
    return await UserRepository.findAll();
  }
}

export const userService = new UserService();