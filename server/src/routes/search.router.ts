import { Router } from "express";
import { searchController } from "../controllers/index.js";
const router = Router();

router.get("/all", searchController.getSearchedAll);

export { router as searchRouter };
