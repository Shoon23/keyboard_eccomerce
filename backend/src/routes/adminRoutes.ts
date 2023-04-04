import { Router } from "express";
import adminController from "../controllers/adminController";
const router = Router();

router.get("/orders", adminController.getOrders);

export default router;
