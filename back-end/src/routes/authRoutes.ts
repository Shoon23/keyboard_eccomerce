import { Router } from "express";
import authController from "../controllers/authController";
const router = Router();

router.post("/register", authController.registerController);
router.post("/login", authController.loginController);
router.get("/refreshToken", authController.refreshAccessToken);

export default router;
