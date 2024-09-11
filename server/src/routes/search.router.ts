import { Router } from "express";
import { searchController } from "../controllers/index";
import { query } from "express-validator";
import { validators } from "../middlewares/index";
const router = Router();

router.get(
  "/all",
  [query("page", "invalid page number").default(1).exists().notEmpty().isInt(), query("query").default("")],
  validators.validateArguments,
  searchController.getSearchedAll
);

export { router as searchRouter };
