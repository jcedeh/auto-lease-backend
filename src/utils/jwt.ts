import { UserRole } from "../modules/users/user-role.enum.js";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  role: UserRole;
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as JwtPayload;
}