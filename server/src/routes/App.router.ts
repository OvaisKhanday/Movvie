import express from "express";
import appController from "../controllers/App.controller.js";

const router = express.Router();

router.get("/", appController.get);

export { router as appRouter };
