import { Router } from "express";
import { userMiddleware, multerUpload, authMiddleware, validators } from "../middlewares/index.js";
import { userController } from "../controllers/index.js";
import { body } from "express-validator";

const router = Router();

router.post(
  "/signup",
  multerUpload.single("image"),
  [
    body("password")
      .exists()
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters long"),
    body("name")
      .exists()
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 4 })
      .withMessage("name must be at least 4 characters long"),
    body("age").exists().trim().notEmpty().isInt({ lt: 100, gt: 5 }).withMessage("invalid age - too old or young"),
  ],
  validators.validateArguments,
  userMiddleware.validateSignupDetails,
  userController.registerUser
);

router.post("/login", userMiddleware.validateLoginDetails, userController.loginUser);
router.get("/logout", userController.logoutUser);
router.get("/user", authMiddleware.authenticateUser, userController.getUser);

export { router as userRouter };
