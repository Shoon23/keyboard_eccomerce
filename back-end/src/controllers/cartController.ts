import { Request, Response } from "express";
import prisma from "../prisma";
import { iCartItem } from "../types";

export default {
  async getAllCartItem(req: Request, res: Response) {
    const cartId: string = req.params.cartId;
    try {
      const cartItem = await prisma.cartItem.findMany({
        where: {
          cartId: cartId,
        },
        include: {
          product: true,
        },
      });
      res.status(200).json(cartItem);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  async addItemToCart(req: Request, res: Response) {
    const { cartId, productId, quantity }: iCartItem = req.body;
    try {
      const createCartItem = await prisma.cartItem.create({
        data: {
          cartId: cartId,
          productId: productId,
          quantity,
        },
      });
      res.status(201).json(createCartItem);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  async removeItemToCart(req: Request, res: Response) {
    const cartItemId = req.params.cartItemId;
    try {
      await prisma.cartItem.delete({
        where: {
          cartItemId: cartItemId,
        },
      });

      res.status(200).json({
        message: "Item Deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  async updateCartItem(req: Request, res: Response) {
    const { quantity, cartItemId }: iCartItem = req.body;
    try {
      const updateCartItem = await prisma.cartItem.update({
        where: {
          cartItemId: cartItemId,
        },
        data: {
          quantity,
        },
      });

      res.status(201).json(updateCartItem);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
};
