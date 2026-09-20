const express = require("express");
const morgan = require("morgan");
const { Kafka, logLevel } = require("kafkajs");
const loggingRoutes = require("./application/controllers/logging-controller.js");
const config = require("./config.js");

const app = express();
const port = 3000;
const kafka = new Kafka({
  brokers: [config.kafka.broker],
  logLevel: logLevel.ERROR,
});
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: config.kafka.clusterId });
async function init() {
  await producer.connect();
  await consumer.connect();
}
app.use(morgan("dev"));
init().catch(console.error);
app.use("/logs", loggingRoutes);

app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

process.on("SIGTERM", async () => {
  await consumer.disconnect();
  await producer.disconnect();
  process.exit(0);
});

module.exports = {
  producer,
  consumer,
};
