import { Router } from "express";
import { getThumbnail, getHighResImage } from "../controllers/image.controller.js";

const router = Router();

router.get("/thumbnail/:img_id", getThumbnail);
router.get("/high/:img_id", getHighResImage);

export { router as imagesRouter };
