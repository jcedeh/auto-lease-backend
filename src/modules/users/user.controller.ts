import type { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service.js";

export class UserController {
  constructor(
      private readonly userService:UserService
    ) {}
  
    getAllUsers = async(
    req: Request,
    res: Response,
    next: NextFunction
  )=> {
    try {
      const users = await this.userService.getAllUsers();

      res.status(200).json({
        success: true,
        data: users,
      });
    } 
      catch (error) {
      next(error);
    }
  }
}
