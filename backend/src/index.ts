import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import prisma from "./prisma";

import {
  authRoutes,
  cartRoutes,
  productRoutes,
  userRoutes,
  stripeRoutes,
  webhookRoutes,
  adminRoutes,
} from "./routes";
import verifyAccessToken from "./middleware/verifyAccessToken";
import isAdmin from "./middleware/isAdmin";

const app = express();

const PORT = 8080;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/stripe", webhookRoutes);
app.use(express.json());
app.use("/stripe", stripeRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/admin", isAdmin, adminRoutes);
app.use(verifyAccessToken);
app.use("/cart", cartRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`App running`);
});
