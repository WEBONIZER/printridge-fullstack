import { Router } from "express";
import {
  createExample,
  getExampleByID,
  getExampleByRoute,
  updateExample,
  deleteExample,
  getPaginatedExamples,
  toggleExamplePublicStatus,
} from "../controllers/examples-controllers";
import { jwtMiddleware } from "../middlewares/jwt-middleware";

export const examples = Router()
  .get("/paginated", jwtMiddleware, getPaginatedExamples)
  .get("/route/:route", getExampleByRoute) // Публичный endpoint для блога
  .post("/", jwtMiddleware, createExample)
  .get("/:exampleId", jwtMiddleware, getExampleByID)
  .put("/:exampleId", jwtMiddleware, updateExample)
  .delete("/:exampleId", jwtMiddleware, deleteExample)
  .patch("/:exampleId/public", jwtMiddleware, toggleExamplePublicStatus);

