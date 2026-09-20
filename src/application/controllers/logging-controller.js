const express = require("express");
const router = express.Router();
const { recordLog } = require("../services/logging-service.js");
const { Log } = require("../../domain/entities/log");

router.post("/", (req, res) => {
  console.log("Received log request:", req.body);
  const { level, message } = req.body;

  const log = new Log({ level, message, timestamp: new Date() });
  // await loggingService.recordLog(log);
  (async () => {
    const data = await recordLog(log);
    console.log(data);
  })();

  res.json({ message: "Log successfully created" });
});

module.exports = router;
