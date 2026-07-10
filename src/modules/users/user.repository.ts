import { AppDataSource } from "../../config/data-source.js";
import { User } from "./user.entity.js";

export const userRepository = AppDataSource.getRepository(User);