const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    source: "origin",
    cacheable: false,
    currentTime: new Date().toISOString(),
  });
});

module.exports = router;