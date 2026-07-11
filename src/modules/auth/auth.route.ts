import { Router } from "express";
import { UserRepository } from "../users/user.repository.js";
import { AuthController } from "./auth.controller.js";
import {validationMiddleware} from "../../middlewares/validate.middleware.js";
import { RegisterUserDto } from "./auth.dto.js";
import { AuthService } from "./auth.service.js";

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post(
  "/register",
  validationMiddleware(RegisterUserDto),
  authController.register
);

export default router;