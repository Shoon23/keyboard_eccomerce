import { Router } from "express";
import adminController from "../controllers/adminController";
const router = Router();

router.get("/orders", adminController.getOrders);
router.put("/order/status", adminController.updateStatus);
export default router;
