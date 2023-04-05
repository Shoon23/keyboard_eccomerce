import { Request, Response } from "express";
import prisma from "../prisma";
import { iProduct, iReview } from "../types";

import { stripe } from "../services/stripe";
import fs from "fs/promises";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dkarsw8bs",
  api_key: "827135147154243",
  api_secret: "rt4nbskpN7AEzO1MizUH2nP-vpI",
});

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
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  async addProduct(req: Request, res: Response) {
    const newImg: any = req.files;
    const {
      productName,
      productPrice,
      productStock,
      productDescription,
    }: iProduct = req.body;

    let savedImg: any[] = [];

    try {
      const newStripeProducts = await stripe.products.create({
        name: productName,
        default_price_data: {
          currency: "php",
          unit_amount: productPrice * 100,
        },
      });

      const createProduct = await prisma.product.create({
        data: {
          productName: productName,
          productPrice: Number(productPrice),
          productStock: Number(productStock),
          productDescription: productDescription,
          productPriceId: newStripeProducts.default_price as string,
        },
      });
      if (newImg) {
        const uploadImg = newImg.map((item: any) => {
          const upload = cloudinary?.uploader?.upload(item.path, {
            public_id: "product_img",
          });

          return upload;
        });

        const uploadedImg = await Promise.all(uploadImg);

        const saveImg = uploadedImg.map((item) => {
          return prisma.productImg.create({
            data: {
              productId: createProduct.productId,
              imgUrl: item.url,
            },
          });
        });
        savedImg = await Promise.all(saveImg);

        const deleteImg = newImg.map((item: any) => fs.unlink(item.path));
        await Promise.all(deleteImg);
      }

      res.status(201).json({ ...createProduct, productImg: savedImg });
    } catch (error) {
      const deleteImg = newImg.map((item: any) => fs.unlink(item.path));
      await Promise.all(deleteImg);

      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  async updateProduct(req: Request, res: Response) {
    const newImg: any = req.files;
    const { productId, toRemoveImg, ...productDetails } = req.body;

    let parseOldImg;
    if (toRemoveImg) {
      parseOldImg = Array.isArray(toRemoveImg) ? toRemoveImg : [toRemoveImg];
    }

    try {
      if (parseOldImg) {
        const deletImg = parseOldImg?.map((img) => {
          return prisma.productImg.delete({
            where: {
              productImgId: img,
            },
          });
        });
        await Promise.all(deletImg);
      }

      if (newImg) {
        const uploadImg = newImg.map((item: any) => {
          const upload = cloudinary.uploader.upload(item.path, {
            public_id: "product_img",
          });

          return upload;
        });

        const uploadedImg = await Promise.all(uploadImg);
        const saveImg = uploadedImg.map((item) => {
          return prisma.productImg.create({
            data: {
              productId: productId,
              imgUrl: item.url,
            },
          });
        });
        const savedImg = await Promise.all(saveImg);

        const deleteImg = newImg.map((item: any) => fs.unlink(item.path));
        await Promise.all(deleteImg);
      }
      const updateProductDetails = await prisma.product.update({
        where: {
          productId,
        },
        data: {
          productName: productDetails.productName,
          productDescription: productDetails.productDescription,
          productPrice: Number(productDetails.productPrice),
          productStock: Number(productDetails.productStock),
        },
      });
      res.status(201).json(updateProductDetails);
    } catch (error) {
      const deleteImg = newImg.map((item: any) => fs.unlink(item.path));
      await Promise.all(deleteImg);
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  async deleteProduct(req: Request, res: Response) {
    const productId = req.params.productId;
    try {
      await prisma.product.update({
        where: {
          productId,
        },
        data: {
          isDelete: true,
        },
      });

      res.status(200).json({
        message: "Product Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
};
