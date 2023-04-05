import { Request, Response } from "express";
import prisma from "../prisma";

export default {
  async getOrders(req: Request, res: Response) {
    if (!res.locals.isAdmin) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }
    try {
      const orders = await prisma.orders.findMany({
        take: 20,
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
          checkout: {
            include: {
              user: true,
            },
          },
        },
      });

      res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something Went Wrong" });
    }
  },
  async updateStatus(req: Request, res: Response) {
    const { ordersId, status } = req.body;
    if (!res.locals.isAdmin) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }
    try {
      const updateStatus = await prisma.orders.update({
        where: {
          ordersId,
        },
        data: {
          status,
        },
      });

      res.status(200).json(updateStatus);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something Went Wrong" });
    }
  },
};
