import { Router } from "express";
import cartController from "../controllers/cartController";

const router = Router();

router.get("/:cartId", cartController.getAllCartItem);
router.post("/add", cartController.addItemToCart);
router.delete("/delete/:cartItemId", cartController.removeItemToCart);
router.put("/update", cartController.updateCartItem);

export default router;
