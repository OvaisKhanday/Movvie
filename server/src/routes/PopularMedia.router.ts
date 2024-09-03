import express from "express";
import popularMediaController from "../controllers/popularMedia.controller.js";
// import trendingController from "../controllers/Trending.controller.js";

const router = express.Router();

router.get("/all", popularMediaController.getAll);
router.get("/movies", popularMediaController.getAll);
router.get("/tv", popularMediaController.getAll);

export { router as popularMediaRouter };
