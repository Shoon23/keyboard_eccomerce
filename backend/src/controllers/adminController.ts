import { Request, Response } from "express";
import prisma from "../prisma";

export default {
  async getOrders(req: Request, res: Response) {
    const userId = res.locals.userId;
    if (!res.locals.isAdmin) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    try {
      // const orders = await prisma.checkOut.findMany({
      //   where: {
      //     NOT: {
      //       userId,
      //     },
      //   },
      //   include: {
      //     user: true,
      //     orders: {
      //       include: {
      //         orderItems: {
      //           include: {
      //             product: {
      //               include: {
      //                 productImg: true,
      //               },
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      // });

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
};
