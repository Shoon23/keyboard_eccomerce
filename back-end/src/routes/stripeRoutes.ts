import express, { Router } from "express";
import Stripe from "stripe";
import { Orders } from "@prisma/client";
import prisma from "../prisma";
const router = Router();

const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: "2022-11-15",
});

const MY_DOMAIN = process.env.MY_DOMAIN;

router.post("/create-checkout-session", async (req, res) => {
  const orders = req.body;

  const line_items: any[] = [];

  const amount = orders.price + 50;

  const createOrder = await prisma.orders.create({
    data: {
      amount: amount.toString(),
      userId: orders?.userId,
    },
  });

  const filteredOrder = orders.details.map((item: any) => {
    line_items.push({ quantity: item?.quantity, price: item.price });
    return {
      price: item?.amount.toString(),
      quantity: item?.quantity,
      productId: item.productId,
      ordersId: createOrder.ordersId,
    };
  });

  const createOrderItem = await prisma.orderItem.createMany({
    data: filteredOrder,
  });

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: orders.email,
      metadata: {
        userId: orders?.userId,
        ordersId: createOrder.ordersId,
        cartId: orders.cartId,
      },
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: ["PH"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 5000, currency: "php" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      line_items: line_items,
      phone_number_collection: {
        enabled: true,
      },
      mode: "payment",
      success_url: `${MY_DOMAIN}/success`,
      cancel_url: `${MY_DOMAIN}/cart`,
      currency: "php",
    });

    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
  }
});

export default router;
