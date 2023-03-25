import { iReview } from "../types";
import { Request, Response } from "express";
import prisma from "../prisma";

export default {
  async addProductReviews(req: Request, res: Response) {
    const { productId, userId, reviewDescription, reviewStar }: iReview =
      req.body;

    try {
      const addReview = await prisma.productReviews.create({
        data: {
          productId: productId,
          userId: userId,
          reviewDescription: reviewDescription,
          reviewStar: reviewStar,
        },
      });

      res.status(201).json(addReview);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  async getAllFavorites(req: Request, res: Response) {
    const favoritesId = req.params.favoritesId;

    try {
      const getfavorites = await prisma.favoriteItem.findMany({
        where: {
          favoritesId,
        },
        include: {
          product: {
            include: {
              productImg: true,
            },
          },
        },
      });

      res.status(200).json(getfavorites);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  async addFavorite(req: Request, res: Response) {
    const { productId, favoritesId } = req.body;
    try {
      const addFavorite = await prisma.favoriteItem.create({
        data: { favoritesId, productId },
      });
      res.status(201).json(addFavorite);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  async removeFavorite(req: Request, res: Response) {
    const favoriteItemId = req.params.favoriteItemId;
    try {
      await prisma.favoriteItem.delete({
        where: {
          favoriteItemId,
        },
      });
      res.status(200).json({
        message: "Item Removed",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
};
