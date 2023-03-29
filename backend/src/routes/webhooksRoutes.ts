import { Router, raw } from "express";
import webhooksController from "../controllers/webhooksController";
import verifyAccessToken from "../middleware/verifyAccessToken";
const router = Router();

router.post(
  "/webhook",
  raw({ type: "*/*" }),
  webhooksController.stripeWebhooks
);

export default router;
