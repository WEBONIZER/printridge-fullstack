import { Router } from "express";
import { generateSitemap } from "../controllers/sitemap-controller";

export const sitemap = Router()
  .get("/sitemap.xml", generateSitemap);

