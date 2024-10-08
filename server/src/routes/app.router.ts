import express from "express";
import { appController } from "../controllers/index";

const router = express.Router();

router.get("/", appController.get);

export { router as appRouter };
