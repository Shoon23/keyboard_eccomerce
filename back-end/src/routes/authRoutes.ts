import { Router } from "express";
import authController from "../controllers/authController";
const router = Router();

router.post("/register", authController.registerController);
router.post("/login", authController.loginController);

export default router;
