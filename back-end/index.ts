import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("gago");
});

app.listen(PORT, () => {});
