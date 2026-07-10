import { userRepository } from "./user.repository.js";

export class UserService {
  async getAllUsers() {
    return await userRepository.find();
  }
}

export const userService = new UserService();