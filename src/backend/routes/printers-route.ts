import { Router } from "express";
import {
  createPrinter,
  deletePrinter,
  getPrinterByID,
  updatePrinter,
  getPaginatedPrinters,
  getPrinterVendors,
  togglePrinterPublicStatus,
  searchPrinterModels,
} from "../controllers/printers-controllers";
import { jwtMiddleware } from "../middlewares/jwt-middleware";

export const printers = Router()
  // Статические GET роуты
  .get("/vendors", jwtMiddleware, getPrinterVendors)
  .get("/paginated", jwtMiddleware, getPaginatedPrinters)
  .get("/search-models", jwtMiddleware, searchPrinterModels)

  // Статические POST роуты
  .post("/", jwtMiddleware, createPrinter)

  // Динамические GET роуты
  .get("/:printerId", jwtMiddleware, getPrinterByID)

  // Динамические PUT роуты
  .put("/:printerId", jwtMiddleware, updatePrinter)

  // Динамические DELETE роуты
  .delete("/:printerId", jwtMiddleware, deletePrinter)

  // Динамические PATCH роуты для изменения статуса public
  .patch("/:printerId/public", jwtMiddleware, togglePrinterPublicStatus);

