const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    source: "origin",
    cacheable: true,
    products: [
      {
        id: 1,
        name: "Laptop",
        price: 65000,
      },
      {
        id: 2,
        name: "Keyboard",
        price: 2500,
      },
      {
        id: 3,
        name: "Mouse",
        price: 1200,
      },
    ],
  });
});

module.exports = router;
