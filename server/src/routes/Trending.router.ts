import express from "express";
import trendingController from "../controllers/Trending.controller.js";

const router = express.Router();

router.get("/all", trendingController.get);

export { router as trendingRouter };
