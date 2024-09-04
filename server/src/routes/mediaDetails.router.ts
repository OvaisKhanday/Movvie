import { Router } from "express";
import { mediaDetailsController } from "../controllers/index.js";

const router = Router();

router.get("/movie/:id", mediaDetailsController.getMovieDetails);
router.get("/tv/:id", mediaDetailsController.getTVShowDetails);

export { router as mediaDetailsRouter };
