import { Router } from "express";
import {
  getAllLaptopPriceTemplates,
  getLaptopPriceTemplateById,
  updateLaptopPriceTemplate,
} from "../controllers/laptop-price-templates-controllers";
import { jwtMiddleware } from "../middlewares/jwt-middleware";

export const laptopPriceTemplates = Router()
  .get("/", jwtMiddleware, getAllLaptopPriceTemplates)
  .get("/:templateId", jwtMiddleware, getLaptopPriceTemplateById)
  .put("/:templateId", jwtMiddleware, updateLaptopPriceTemplate);

