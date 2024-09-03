import { Router } from "express";
import { getMovieDetails, getTVShowDetails } from "../controllers/mediaDetails.controller.js";

const router = Router();

router.get("/movie/:id", getMovieDetails);
router.get("/tv/:id", getTVShowDetails);

export { router as mediaDetailsRouter };
