import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", upload.single("image"), registerUser);

router.post("/login", loginUser);
router.get("/logout", logoutUser);

export { router as userRouter };
