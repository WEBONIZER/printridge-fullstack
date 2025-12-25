import { Router } from "express";
import {
  createPrice,
  getPriceByID,
  getPriceByPrinterId,
  updatePrice,
  deletePrice,
  getPaginatedPrices,
} from "../controllers/prices-controllers";
import { jwtMiddleware } from "../middlewares/jwt-middleware";

export const prices = Router();

// Получить список прайсов (с пагинацией)
prices.get("/paginated", jwtMiddleware, getPaginatedPrices);

// Получить прайс по printerId (должен быть перед /:priceId)
prices.get("/printer/:printerId", jwtMiddleware, getPriceByPrinterId);

// Получить прайс по ID
prices.get("/:priceId", jwtMiddleware, getPriceByID);

// Создать прайс
prices.post("/", jwtMiddleware, createPrice);

// Обновить прайс
prices.put("/:priceId", jwtMiddleware, updatePrice);

// Удалить прайс
prices.delete("/:priceId", jwtMiddleware, deletePrice);

