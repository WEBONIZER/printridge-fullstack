import { Router } from "express";
import {
  createCompatibility,
  deleteCompatibility,
  getPrintersByCartridgeId,
  getCartridgesByPrinterId,
  getPaginatedCompatibilities
} from "../controllers/compatibilities-controllers";
import { jwtMiddleware } from "../middlewares/jwt-middleware";

export const compatibilities = Router()
  // Получить все связи с пагинацией
  .get("/paginated", jwtMiddleware, getPaginatedCompatibilities)

  // Получить все принтеры для картриджа
  .get("/cartridge/:cartridgeId/printers", jwtMiddleware, getPrintersByCartridgeId)

  // Получить все картриджи для принтера
  .get("/printer/:printerId/cartridges", jwtMiddleware, getCartridgesByPrinterId)

  // Создать связь
  .post("/", jwtMiddleware, createCompatibility)

  // Удалить связь
  .delete("/:compatibilityId", jwtMiddleware, deleteCompatibility);

