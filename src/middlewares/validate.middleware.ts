import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validationMiddleware<T extends object>(
  dtoClass: new () => T
) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    const dto = plainToInstance(dtoClass, req.body);

    const errors = await validate(dto);

    if (errors.length > 0) {

      res.status(400).json({
        success: false,
        errors
      });

      return;
    }

    req.body = dto;

    next();
  };
}