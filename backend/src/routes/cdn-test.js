const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const start = Date.now();

  // Simulate slow origin processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const responseTime = Date.now() - start;

  res.json({
    source: "origin",
    message: "This response intentionally takes time.",
    responseTime: `${responseTime} ms`,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;