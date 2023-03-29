import { NextFunction, Router, Request, Response } from "express";
import authController from "../controllers/authController";
import verifyAccessToken from "../middleware/verifyAccessToken";

const router = Router();

router.post("/register", authController.registerController);
router.post("/login", authController.loginController);
router.get("/logout", verifyAccessToken, authController.logoutController);
router.get("/refreshToken", authController.refreshAccessToken);

export default router;
