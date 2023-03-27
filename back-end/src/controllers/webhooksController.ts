import { Request, Response } from "express";
import Stripe from "stripe";
import prisma from "../prisma";
const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: "2022-11-15",
});
export default {
  async stripeWebhooks(req: Request, res: Response) {
    const sig = req.headers["stripe-signature"] as string;
    const endPoint =
      "whsec_4dad571242a1182fe30d9a8685072cc372d9c1298dbc1f7aeb5cd8338b11c745";

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endPoint);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err}`);
      return;
    }

    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted: any = event.data.object;
        console.log(checkoutSessionCompleted);
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
        } catch (error) {
          console.log(error);
        }
        await prisma.cartItem.deleteMany({
          where: {
            cartId: checkoutSessionCompleted.metadata.cartId,
          },
        });
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.send().end();
  },
};
