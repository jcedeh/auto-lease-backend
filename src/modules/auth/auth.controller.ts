import type { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service.js";

export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  )  =>{
    try {
      const user = await this.authService.register(req.body);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });

    } catch (error) {
      next(error);
    }
  }

  login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const result = await this.authService.login(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });

  } catch (error) {
    next(error);
  }
};

}