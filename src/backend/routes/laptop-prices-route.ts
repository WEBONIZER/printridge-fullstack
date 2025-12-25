import { Router } from "express";
import {
  createLaptopPrice,
  getLaptopPriceByID,
  getLaptopPriceByLaptopId,
  updateLaptopPrice,
  deleteLaptopPrice,
  getPaginatedLaptopPrices,
} from "../controllers/laptop-prices-controllers";
import { jwtMiddleware } from "../middlewares/jwt-middleware";

export const laptopPrices = Router();

// Получить список прайсов (с пагинацией)
laptopPrices.get("/paginated", jwtMiddleware, getPaginatedLaptopPrices);

// Получить прайс по laptopId (должен быть перед /:priceId)
laptopPrices.get("/laptop/:laptopId", jwtMiddleware, getLaptopPriceByLaptopId);

// Получить прайс по ID
laptopPrices.get("/:priceId", jwtMiddleware, getLaptopPriceByID);

// Создать прайс
laptopPrices.post("/", jwtMiddleware, createLaptopPrice);

// Обновить прайс
laptopPrices.put("/:priceId", jwtMiddleware, updateLaptopPrice);

// Удалить прайс
laptopPrices.delete("/:priceId", jwtMiddleware, deleteLaptopPrice);

