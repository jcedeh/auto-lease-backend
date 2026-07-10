import type { Request, Response, NextFunction } from "express";
import { userService } from "./user.service.js";

export class UserController {
  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await userService.getAllUsers();

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();