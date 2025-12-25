import { Router } from "express";
import {
  createPrinter,
  deletePrinter,
  getPrinterByID,
  updatePrinter,
  getPaginatedPrinters,
  getPrinterVendors,
} from "../controllers/printers-controllers";
import { jwtMiddleware } from "../middlewares/jwt-middleware";

export const printers = Router()
  // Статические GET роуты
  .get("/vendors", jwtMiddleware, getPrinterVendors)
  .get("/paginated", jwtMiddleware, getPaginatedPrinters)

  // Статические POST роуты
  .post("/", jwtMiddleware, createPrinter)

  // Динамические GET роуты
  .get("/:printerId", jwtMiddleware, getPrinterByID)

  // Динамические PUT роуты
  .put("/:printerId", jwtMiddleware, updatePrinter)

  // Динамические DELETE роуты
  .delete("/:printerId", jwtMiddleware, deletePrinter);

