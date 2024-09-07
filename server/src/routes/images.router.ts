import { Router } from "express";
import { imageController } from "../controllers/index.js";
import { param } from "express-validator";
import { validators } from "../middlewares/index.js";

const router = Router();

router.get(
  "/thumbnail/:img_id",
  [param("img_id", "invalid image id").exists().trim().notEmpty().isInt()],
  validators.validateArguments,
  imageController.getThumbnail
);
router.get(
  "/high/:img_id",
  [param("img_id", "invalid image id").exists().trim().notEmpty().isInt()],
  validators.validateArguments,
  imageController.getHighResImage
);

export { router as imagesRouter };
