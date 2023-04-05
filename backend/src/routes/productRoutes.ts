import { Router } from "express";
import productsController from "../controllers/productsController";
import multer from "multer";
import isAdmin from "../middleware/isAdmin";

const router = Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads");
  },
  filename(req, file, callback) {
    callback(null, req.body.productId + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", productsController.getAllProducts);
router.get("/:productId", productsController.getSingleProduct);
router.use(isAdmin);
router.post("/add", upload.array("images"), productsController.addProduct);
router.put("/update", upload.array("images"), productsController.updateProduct);
router.delete("/delete/:productId", productsController.deleteProduct);

export default router;
