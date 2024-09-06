import { Router } from "express";
import { userMiddleware, multerUpload } from "../middlewares/index.js";
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

export { router as userRouter };
