import { Router } from "express";
import { getSearchedAll } from "../controllers/search.controller.js";
const router = Router();

router.get("/all", getSearchedAll);

export { router as searchRouter };
