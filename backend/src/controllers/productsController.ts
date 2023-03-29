import { Request, Response } from "express";
import prisma from "../prisma";
import { iProduct, iReview } from "../types";
import cloudinaryConn from "../services/cloudinary";
import fs from "fs/promises";

export default {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany({
        take: 10,
        include: {
          productImg: true,
        },
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
          reviews: {
            take: 5,
            include: {
              user: true,
            },
          },
          productImg: true,
        },
      });

      if (!getProduct) {
        return res.status(404).json({
          message: "Cannot Find Product",
        });
      }

      res.status(200).json(getProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  async addProduct(req: Request, res: Response) {
    const filePath = req.file?.path as string;
    const {
      productName,
      productPrice,
      productStock,
      productDescription,
    }: iProduct = req.body;

    console.log(productName);
    console.log(filePath);
    try {
      const createProduct = await prisma.product.create({
        data: {
          productName: productName,
          productPrice: productPrice,
          productStock: productStock,
          productDescription: productDescription,
          productPriceId: "",
        },
      });

      const response = await cloudinaryConn().uploader.upload(filePath, {
        public_id: "product_img",
      });

      const createProductImg = await prisma.productImg.create({
        data: {
          productId: createProduct.productId,
          imgUrl: response.data.secure_url,
        },
      });
      await fs.unlink(filePath);

      res.status(201).json({ ...createProduct, img: createProductImg.imgUrl });
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
};
