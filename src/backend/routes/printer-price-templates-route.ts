import { Router } from "express";
import {
  getAllPrinterPriceTemplates,
  getPrinterPriceTemplateById,
  updatePrinterPriceTemplate,
} from "../controllers/printer-price-templates-controllers";
import { jwtMiddleware } from "../middlewares/jwt-middleware";

export const printerPriceTemplates = Router()
  .get("/", jwtMiddleware, getAllPrinterPriceTemplates)
  .get("/:templateId", jwtMiddleware, getPrinterPriceTemplateById)
  .put("/:templateId", jwtMiddleware, updatePrinterPriceTemplate);

