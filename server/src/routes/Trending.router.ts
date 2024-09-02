import express from "express";
import trendingController from "../controllers/Trending.controller.js";

const router = express.Router();

router.get("/", trendingController.get);

export default router;
