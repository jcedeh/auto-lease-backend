import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { HTTP_STATUS } from "../constants/http-status.js";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
        try {
            const authHeader = req.headers.authorization;

        if (
        !authHeader ||
        !authHeader.startsWith("Bearer ")
    ) {
        throw new AppError(
            "Unauthorized",
            HTTP_STATUS.UNAUTHORIZED
        );
    }
    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    req.user = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
    };
    next();
        
} catch (error) {
    throw new AppError(
    "Unauthorized",
    HTTP_STATUS.UNAUTHORIZED
);
    }

};