import { Request, Response } from "express";
import prisma from "../prisma";
import { iProduct, iReview } from "../types";

export default {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany({
        take: 10,
      });

      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  async getSingleProduct(req: Request, res: Response) {
    const productId = req.params.productId;
    try {
      const getProduct = await prisma.product.findFirst({
        where: {
          productId: productId,
        },
        include: {
          reviews: true,
        },
      });
      res.status(200).json(getProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  async addProduct(req: Request, res: Response) {
    const {
      productName,
      productPrice,
      productStock,
      productDescription,
    }: iProduct = req.body;

    try {
      const createProduct = await prisma.product.create({
        data: {
          productName: productName,
          productPrice: productPrice,
          productStock: productStock,
          productDescription: productDescription,
        },
      });

      res.status(201).json(createProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  async updateProduct(req: Request, res: Response) {
    const { productId, ...productDetails }: iProduct = req.body;
    try {
      const updateProduct = await prisma.product.update({
        where: {
          productId: productId,
        },
        data: productDetails,
      });

      res.status(201).json(updateProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  async deleteProduct(req: Request, res: Response) {
    const productId = req.params.productId;
    try {
      await prisma.product.delete({
        where: {
          productId,
        },
      });

      res.status(200).json({
        message: "Product Deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
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
};
