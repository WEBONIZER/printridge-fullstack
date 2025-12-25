import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user-model";
import { resolve } from "path";
import { config } from "dotenv";

const envPath = resolve(process.cwd(), ".env");
const parsed = config({ path: envPath }).parsed;
const JWT_SECRET = parsed?.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRE = parsed?.JWT_EXPIRE || "7d";

interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

interface LoginData {
  email: string;
  password: string;
}

// Генерация JWT токена
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

// Установка токена в httpOnly cookie
const setTokenCookie = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true, // Cookie недоступна из JavaScript
    secure: false, // Для localhost и HTTP всегда false
    sameSite: "lax", // lax работает для localhost и cross-site навигации
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    path: "/", // Cookie доступна для всех путей
  });
};

// Регистрация пользователя
export const register = async (req: Request, res: Response) => {
  try {
    let data: RegisterData;
    if (typeof req.body.data === "string") {
      data = JSON.parse(req.body.data);
    } else if (typeof req.body.data === "object") {
      data = req.body.data;
    } else {
      data = req.body;
    }

    if (!data.email?.trim()) {
      return res.status(400).json({ error: "Email обязателен" });
    }

    if (!data.password?.trim()) {
      return res.status(400).json({ error: "Пароль обязателен" });
    }

    if (data.password.length < 6) {
      return res.status(400).json({ error: "Пароль должен содержать минимум 6 символов" });
    }

    // Проверяем, не существует ли уже пользователь с таким email
    const existingUser = await UserModel.findOne({ email: data.email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ error: "Пользователь с таким email уже существует" });
    }

    // Создаем нового пользователя
    const user = new UserModel({
      email: data.email.toLowerCase().trim(),
      password: data.password,
      name: data.name?.trim() || undefined,
    });

    const savedUser = await user.save();
    const userObj = savedUser.toObject() as any;

    // Генерируем токен
    const token = generateToken(savedUser._id.toString());

    // Устанавливаем токен в cookie
    setTokenCookie(res, token);

    res.status(201).json({
      success: true,
      data: {
        id: userObj._id,
        email: userObj.email,
        name: userObj.name,
        role: userObj.role,
        createdAt: userObj.createdAt,
      },
      message: "Пользователь успешно зарегистрирован",
    });
  } catch (error: any) {
    console.error("Register error:", error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: "Невалидный JSON" });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        error: "Ошибка валидации данных",
        details: Object.values(error.errors).map((err: any) => err.message),
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({ error: "Пользователь с таким email уже существует" });
    }

    res.status(500).json({
      error: "Внутренняя ошибка сервера",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Авторизация пользователя
export const login = async (req: Request, res: Response) => {
  try {
    let data: LoginData;
    if (typeof req.body.data === "string") {
      data = JSON.parse(req.body.data);
    } else if (typeof req.body.data === "object") {
      data = req.body.data;
    } else {
      data = req.body;
    }

    if (!data.email?.trim()) {
      return res.status(400).json({ error: "Email обязателен" });
    }

    if (!data.password?.trim()) {
      return res.status(400).json({ error: "Пароль обязателен" });
    }

    // Находим пользователя и получаем пароль (select: false по умолчанию)
    const user = await UserModel.findOne({ email: data.email.toLowerCase().trim() }).select("+password");
    
    if (!user) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    // Проверяем пароль
    const userObj = user.toObject() as any;
    const isPasswordValid = await bcrypt.compare(data.password, userObj.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    // Генерируем токен
    const token = generateToken(user._id.toString());

    // Устанавливаем токен в cookie
    setTokenCookie(res, token);

    res.status(200).json({
      success: true,
      data: {
        id: userObj._id,
        email: userObj.email,
        name: userObj.name,
        role: userObj.role,
        createdAt: userObj.createdAt,
      },
      message: "Успешная авторизация",
    });
  } catch (error: any) {
    console.error("Login error:", error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: "Невалидный JSON" });
    }

    res.status(500).json({
      error: "Внутренняя ошибка сервера",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Выход (удаление токена)
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    res.status(200).json({
      success: true,
      message: "Успешный выход",
    });
  } catch (error: any) {
    console.error("Logout error:", error);
    res.status(500).json({
      error: "Внутренняя ошибка сервера",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Получить текущего пользователя
export const getMe = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Не авторизован" });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const userObj = user.toObject() as any;

    res.status(200).json({
      success: true,
      data: {
        id: userObj._id,
        email: userObj.email,
        name: userObj.name,
        role: userObj.role,
        createdAt: userObj.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Get me error:", error);
    res.status(500).json({
      error: "Внутренняя ошибка сервера",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

