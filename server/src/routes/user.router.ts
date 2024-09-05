import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { userController } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", upload.single("image"), userController.registerUser);

router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);

export { router as userRouter };
