import express from "express";
import popularMediaController from "../controllers/popularMedia.controller.js";
// import trendingController from "../controllers/Trending.controller.js";

const router = express.Router();

router.get("/all", popularMediaController.getAll);
router.get("/movies", popularMediaController.getMovies);
router.get("/tv", popularMediaController.getTVShows);

export { router as popularMediaRouter };
