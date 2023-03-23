import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRoutes, cartRoutes, productRoutes } from "./routes";
import verifyAccessToken from "./middleware/verifyAccessToken";

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use(verifyAccessToken);
app.use("/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:8080`);
});
