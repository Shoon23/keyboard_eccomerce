import { Request, Response } from "express";
import { stripe } from "../services/stripe";
import prisma from "../prisma";

export default {
  async stripeWebhooks(req: Request, res: Response) {
    const endPoint = process.env.END_POINT as string;

    let event = req.body;

    if (endPoint) {
      const sig = req.headers["stripe-signature"] as string;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endPoint);
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err}`);
        return;
      }
    }

    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted: any = event.data.object;
        try {
          await prisma.shippingAddress.create({
            data: {
              ...checkoutSessionCompleted?.customer_details?.address,
              email: checkoutSessionCompleted?.customer_details?.email,
              phone: checkoutSessionCompleted?.customer_details?.phone,
              ordersId: checkoutSessionCompleted.metadata.ordersId,
            },
          });
          await prisma.orderItem.updateMany({
            where: {
              ordersId: checkoutSessionCompleted.metadata.ordersId,
            },
            data: {
              status: "completed",
            },
          });
          await prisma.cartItem.deleteMany({
            where: {
              cartId: checkoutSessionCompleted.metadata.cartId,
            },
          });
        } catch (error) {
          return res.status(500).json({
            message: "Something Went Wrong",
          });
        }

        break;
    }

    res.send().end();
  },
};
