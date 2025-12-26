import { Router } from "express";
import {
  createLaptop,
  deleteLaptop,
  getLaptopByID,
  updateLaptop,
  getPaginatedLaptops,
  toggleLaptopPublicStatus,
} from "../controllers/laptops-controllers";
import { jwtMiddleware } from "../middlewares/jwt-middleware";

export const laptops = Router()
  // Статические GET роуты
  .get("/paginated", jwtMiddleware, getPaginatedLaptops)

  // Статические POST роуты
  .post("/", jwtMiddleware, createLaptop)

  // Динамические GET роуты
  .get("/:laptopId", jwtMiddleware, getLaptopByID)

  // Динамические PUT роуты
  .put("/:laptopId", jwtMiddleware, updateLaptop)

  // Динамические DELETE роуты
  .delete("/:laptopId", jwtMiddleware, deleteLaptop)

  // Динамические PATCH роуты для изменения статуса public
  .patch("/:laptopId/public", jwtMiddleware, toggleLaptopPublicStatus);

