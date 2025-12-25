import { Router } from "express";
import { register, login, logout, getMe } from "../controllers/auth-controllers";
import { jwtMiddleware } from "../middlewares/jwt-middleware";

export const auth = Router()
  // Публичные роуты (не требуют авторизации)
  .post("/register", register)
  .post("/login", login)

  // Защищенные роуты (требуют авторизации)
  .post("/logout", jwtMiddleware, logout)
  .get("/me", jwtMiddleware, getMe);

