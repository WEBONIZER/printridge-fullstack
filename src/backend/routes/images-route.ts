import { Router } from "express";
import {
  uploadImage,
  updateImage,
  deleteImage,
  getPaginatedImages
} from "../controllers/images-controllers";
import { jwtMiddleware } from "../middlewares/jwt-middleware";
import { uploadSingle } from '../../utils/functions';

export const images = Router()
  .get("/paginated", jwtMiddleware, getPaginatedImages)
  .post("/upload", jwtMiddleware, uploadSingle('file'), uploadImage)
  .put("/:imageId", jwtMiddleware, uploadSingle('file'), updateImage)
  .delete("/:imageId", jwtMiddleware, deleteImage);

