import { AppDataSource } from "../../config/data-source.js";
import { User } from "./user.entity.js";

export class UserRepository {
  private repository = AppDataSource.getRepository(User);

  async findAll() {
    return this.repository.find();
  }

  async findById(id: string) {
    return this.repository.findOne({
      where: { id },
    });
  }

   async findByEmail(email: string) {
    return this.repository.findOne({
      where: { email },
    });
  }

    async createUser(userData: Partial<User>) {
    const user =  this.repository.create(userData);
    return await this.repository.save(user);
  }
}