const express = require("express");
const router = express.Router();
const Log = require("../../domain/entities/log");

router.get("/:startDate/:endDate", (req, res) => {
  console.log("Received log request:", req.body);
  const startRange = new Date(req.params.startDate);
  const endRange = new Date(req.params.endDate);
  const dateQuery = {
    timestamp: {
      $gte: startRange,
      $lte: endRange,
    },
  };
  (async () => {
    const ret = await Log.find(dateQuery);
    console.log("Filtered logs:", ret);
    res.json({ message: "Logs successfully retrieved" });
  })();
});
module.exports = router;
