import express, { Router } from "express";
import { stripe } from "../services/stripe";
import { Orders } from "@prisma/client";
import prisma from "../prisma";
const router = Router();

router.post("/create-checkout-session", async (req, res) => {
  const orders = req.body;

  const line_items: any[] = [];

  const amount = orders.price + 50;

  try {
    const createOrder = await prisma.orders.create({
      data: {
        amount: amount.toString(),
        checkOutId: orders.checkOutId,
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
    const session = await stripe?.checkout?.sessions.create({
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
            display_name: "Shipping fee",
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
      success_url: `${process.env.MY_DOMAIN}/success`,
      cancel_url: `${process.env.MY_DOMAIN}/cart`,
      currency: "php",
    });
    res.send({ url: session.url });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});

export default router;
