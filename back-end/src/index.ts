import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

import { authRoutes } from "./routes";

const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:8080`);
});
