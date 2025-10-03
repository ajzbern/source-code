import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/custom_error";
import cookieParser from "cookie-parser";

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Interface for JWT payload
export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

// Extend Express Request interface
export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authHeader.split(" ")[1]; // Bearer TOKEN format

    if (!token) {
      throw new UnauthorizedError("Invalid token format");
    }

    try {
      const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;
      req.user = decodedToken;

      next();
    } catch (error) {
      throw new UnauthorizedError("Invalid or expired token");
    }
  } catch (error) {
    next(error); // Pass error to Express error handler
  }
};

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      throw new UnauthorizedError("API key is missing");
    }

    if (apiKey !== process.env.API_KEY) {
      throw new UnauthorizedError("Invalid API key");
    }

    next();
  } catch (error) {
    next(error); // Pass error to Express error handler
  }
};
