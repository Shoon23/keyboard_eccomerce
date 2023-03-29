import { Router } from "express";
import productsController from "../controllers/productsController";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads");
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", productsController.getAllProducts);
router.get("/:productId", productsController.getSingleProduct);
router.post("/add", upload.single("image"), productsController.addProduct);
router.put("/update", productsController.updateProduct);
router.delete("/delete/:productId", productsController.deleteProduct);

export default router;
