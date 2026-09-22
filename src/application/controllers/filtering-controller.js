const express = require("express");
const router = express.Router();
const Log = require("../../domain/entities/log");
const { paginatedResults } = require("../../utils.js");
const { LogLevel } = require("../../domain/value-objects/loglevel.js");

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
  if (isNaN(startRange) || isNaN(endRange) || startRange > endRange) {
    return res.status(400).json({ message: "Invalid date format" });
  }
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

router.get("/:level/:startDate/:endDate", paginatedResults(Log), (req, res) => {
  console.log("Received log request:", req.body);
  const startRange = new Date(req.params.startDate);
  const endRange = new Date(req.params.endDate);
  const level = req.params.level;
  if (isNaN(startRange) || isNaN(endRange) || startRange > endRange) {
    return res.status(400).json({ message: "Invalid date format" });
  }
  if (!LogLevel[level]) {
    return res.status(400).json({ message: "Invalid log level" });
  }

  const dateQuery = {
    level: level,
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
