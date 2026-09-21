const { Kafka, logLevel } = require("kafkajs");
const { parentPort } = require("worker_threads");
const crypto = require("crypto");
const mongoose = require("mongoose");

const config = require("../../config.js");
const Log = require("../../domain/entities/log.js");

const dbURI = config.mongo.url;

const kafka = new Kafka({
  brokers: [config.kafka.broker],
  logLevel: logLevel.ERROR,
});
let buffer = [];
// const consumer = kafka.consumer({ groupId: `${crypto.randomUUID()}` });
const consumer = kafka.consumer({ groupId: config.kafka.consumerId });

async function processMessage() {
  await consumer.connect();
  await mongoose.connect(dbURI);
  await consumer.subscribe({
    topic: config.kafka.topic,
    fromBeginning: true,
  });
  console.log("Kafka consumer is running and processing messages");
  await consumer.run({
    eachMessage: async ({ message }) => {
      buffer.push(message.value.toString());
    },
  });
  process.on("SIGTERM", async () => {
    await consumer.disconnect();
    await mongoose.disconnect();
    process.exit(0);
  });

  console.log("Kafka consumer has stopped processing messages");
  setInterval(() => {
    if (buffer.length > 0) {
      const batch = buffer;
      for (const log of batch) {
        const newLog = new Log(JSON.parse(log));
        console.log("Processing log:", newLog);
        newLog.save().catch((error) => {
          console.error("Error saving log to MongoDB:", error);
        });
      }
      parentPort.postMessage(`Messages Processed: ${batch.length}`);
      buffer = [];
    }
  }, 1000);
}

processMessage();

parentPort.postMessage(`Messages Processed`);
