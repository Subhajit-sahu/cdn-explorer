require("dotenv").config();
const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/products");
const timeRouter = require("./routes/time");
const cdnTestRouter = require("./routes/cdn-test");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CDN Lab API is running 🚀",
    server: "Node.js + Express",
  });
});

app.use("/api/products", productsRouter);
app.use("/api/time", timeRouter);
app.use("/api/cdn-test", cdnTestRouter);

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

const server = app.listen(PORT, HOST, () => {
  console.log(`CDN Lab API running on http://${HOST}:${PORT}`);
});

module.exports = { app, server };
