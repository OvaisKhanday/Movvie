import { Router } from "express";
import { authMiddleware, validators } from "../middlewares/index";
import { bookmarksController } from "../controllers/index";
import { body, query } from "express-validator";

const router = Router();

router.get(
  "/all",
  [query("page", "invalid page").default(1).exists().notEmpty().isInt()],
  validators.validateArguments,
  authMiddleware.authenticateUser,
  bookmarksController.getAll
);

router.get(
  "/",
  [query("id", "invalid bookmark id").exists().notEmpty().isInt()],
  validators.validateArguments,
  authMiddleware.authenticateUser,
  bookmarksController.getBookmark
);

router.post(
  "/add",
  [
    body("id", "invalid bookmark id").exists().notEmpty().isInt(),
    body("type", "invalid type - not [movie, tv]")
      .exists()
      .trim()
      .notEmpty()
      .isString()
      .toUpperCase()
      .isIn(["MOVIE", "TV"]),
  ],
  validators.validateArguments,
  authMiddleware.authenticateUser,
  bookmarksController.addBookmark
);

router.delete(
  "/delete",
  [query("id").exists().notEmpty().isInt()],
  validators.validateArguments,
  authMiddleware.authenticateUser,
  bookmarksController.deleteBookmark
);

export { router as bookmarksRouter };
