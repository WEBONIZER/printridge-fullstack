import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { resolve } from "path";
import { config } from "dotenv";

const envPath = resolve(process.cwd(), ".env");
const parsed = config({ path: envPath }).parsed;
const JWT_SECRET = parsed?.JWT_SECRET || "your-secret-key-change-in-production";

// Расширяем тип Request для добавления userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Middleware для проверки JWT токена из cookie
export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Получаем токен из cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Токен не предоставлен",
      });
    }

    // Проверяем токен
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    // Добавляем userId в request
    req.userId = decoded.userId;

    next();
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        error: "Невалидный токен",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Токен истек",
      });
    }

    console.error("JWT middleware error:", error);
    return res.status(500).json({
      success: false,
      error: "Ошибка проверки токена",
    });
  }
};

