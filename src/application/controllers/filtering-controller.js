const express = require("express");
const router = express.Router();
const Log = require("../../domain/entities/log");
const { paginatedResults } = require("../../utils.js");

router.get("/", paginatedResults(Log), (req, res) => {
  console.log("Received log request:", req.body);
  res.json({
    message: "Logs successfully retrieved",
    data: res.paginatedResults,
  });
});

router.get("/:startDate/:endDate", paginatedResults(Log), (req, res) => {
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
    res.json({ message: "Logs successfully retrieved", data: ret });
  })();
});
module.exports = router;
