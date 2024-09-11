import { Router } from "express";
import { mediaDetailsController } from "../controllers/index";
import { param } from "express-validator";
import { validators } from "../middlewares/index";

const router = Router();

router.get(
  "/movie/:id",
  [param("img_id", "invalid image id").exists().trim().notEmpty().isInt()],
  validators.validateArguments,
  mediaDetailsController.getMovieDetails
);
router.get(
  "/tv/:id",
  [param("img_id", "invalid image id").exists().trim().notEmpty().isInt()],
  validators.validateArguments,
  mediaDetailsController.getTVShowDetails
);

export { router as mediaDetailsRouter };
