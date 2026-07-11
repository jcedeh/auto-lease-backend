import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { HTTP_STATUS } from "../constants/http-status.js";
import { UserRole } from "../modules/users/user-role.enum.js";

export const authorize =
    (...roles: UserRole[]) =>
    (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.user) {
        throw new AppError(
        "Unauthorized",
        HTTP_STATUS.UNAUTHORIZED
    );
}
    const allowed = roles.includes(req.user.role);
    if (!allowed) {
    throw new AppError(
        "Forbidden",
        HTTP_STATUS.FORBIDDEN
    );
}
    next();

    };