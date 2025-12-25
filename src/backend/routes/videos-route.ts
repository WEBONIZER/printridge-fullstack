import { Router } from "express";
import {
  uploadVideo,
  updateVideo,
  deleteVideo,
  getVideoByID,
  getPaginatedVideos
} from "../controllers/videos-controllers";
import { jwtMiddleware } from "../middlewares/jwt-middleware";
import { uploadVideoSingle } from '../../utils/functions';

export const videos = Router()
  .get("/paginated", jwtMiddleware, getPaginatedVideos)
  .post("/upload", jwtMiddleware, uploadVideoSingle('file'), uploadVideo)
  .get("/:videoId", jwtMiddleware, getVideoByID)
  .put("/:videoId", jwtMiddleware, uploadVideoSingle('file'), updateVideo)
  .delete("/:videoId", jwtMiddleware, deleteVideo);

