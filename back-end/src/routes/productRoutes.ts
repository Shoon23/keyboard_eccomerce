import { Router } from "express";
import productsController from "../controllers/productsController";

const router = Router();

router.get("/", productsController.getAllProducts);
router.get("/:productId", productsController.getSingleProduct);
router.post("/add", productsController.addProduct);
router.put("/update", productsController.updateProduct);
router.delete("/delete/:productId", productsController.deleteProduct);
router.post("/review/new", productsController.addProductReviews);

export default router;
