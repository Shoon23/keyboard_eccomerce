import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.post("/review/new", userController.addProductReviews);
router.get("/favorites/:favoritesId", userController.getAllFavorites);
router.post("/favorites/add", userController.addFavorite);
router.delete(
  "/favorites/delete/:favoriteItemId",
  userController.removeFavorite
);

export default router;
