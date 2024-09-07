import { Router } from "express";
import {
  userMiddleware,
  multerUpload,
  authMiddleware,
} from "../middlewares/index.js";
import { userController } from "../controllers/index.js";

const router = Router();

router.post(
  "/signup",
  multerUpload.single("image"),
  userMiddleware.validateSignupDetails,
  userController.registerUser
);

router.post(
  "/login",
  userMiddleware.validateLoginDetails,
  userController.loginUser
);
router.get("/logout", userController.logoutUser);
router.get("/user", authMiddleware.authenticateUser, userController.getUser);

export { router as userRouter };
