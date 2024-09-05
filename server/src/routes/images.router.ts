import { Router } from "express";
import { imageController } from "../controllers/index.js";

const router = Router();

router.get("/thumbnail/:img_id", imageController.getThumbnail);
router.get("/high/:img_id", imageController.getHighResImage);

export { router as imagesRouter };
