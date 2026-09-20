const producer = require("../../kafka.js").producer;
const config = require("../../config.js");
const objectHash = require("object-hash");

// async function recordLog(log) {
async function recordLog(log) {
  try {
    producer.send({
      topic: config.kafka.topic,
      messages: [
        {
          key: objectHash(log),
          value: JSON.stringify(log),
        },
      ],
    });
  } catch (error) {
    console.error("Failed to send Kafka message:", error);
    throw error;
  }
}

module.exports = {
  recordLog,
};
