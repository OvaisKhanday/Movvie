import { Router } from "express";
import { imageController } from "../controllers/index";
import { param } from "express-validator";
import { validators } from "../middlewares/index";

const router = Router();

router.get(
  "/thumbnail/:img_id",
  [param("img_id", "invalid image id").exists().trim().notEmpty().isString()],
  validators.validateArguments,
  imageController.getThumbnail
);
router.get(
  "/high/:img_id",
  [param("img_id", "invalid image id").exists().trim().notEmpty().isString()],
  validators.validateArguments,
  imageController.getHighResImage
);

export { router as imagesRouter };
