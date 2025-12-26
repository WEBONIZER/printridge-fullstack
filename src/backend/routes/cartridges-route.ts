import { Router } from "express";
import {
  createCartridge,
  deleteCartridgeByID,
  getCartridgeByID,
  updateCartridge,
  getPaginatedCartridges,
  getCartridgeVendors,
  toggleCartridgePublicStatus,
  searchCartridgeModels,
} from "../controllers/cartridges-controllers";
import { jwtMiddleware } from "../middlewares/jwt-middleware";
import { processImageMiddleware, uploadSingle } from '../../utils/functions'
import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Разрешены только изображения'));
  }
});

export const cartridges = Router()
  // Статические GET роуты
  .get("/vendors", jwtMiddleware, getCartridgeVendors)
  .get("/paginated", jwtMiddleware, getPaginatedCartridges)
  .get("/search-models", jwtMiddleware, searchCartridgeModels)

  // Статические POST роуты
  .post("/all-items", jwtMiddleware, createCartridge)

  // Динамические GET роуты
  .get("/all-items/:cartridgeId", jwtMiddleware, getCartridgeByID)

  // Динамические PUT роуты
  .put("/all-items/:cartridgeId", uploadSingle('file'), processImageMiddleware, jwtMiddleware, updateCartridge)

  // Динамические DELETE роуты
  .delete("/all-items/:cartridgeId", jwtMiddleware, deleteCartridgeByID)

  // Динамические PATCH роуты для изменения статуса public
  .patch("/all-items/:cartridgeId/public", jwtMiddleware, toggleCartridgePublicStatus)
