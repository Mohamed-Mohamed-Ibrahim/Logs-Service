const producer = require("../../kafka.js").producer;
const config = require("../../config.js");

async function recordLog(log) {
  try {
    await producer.send({
      topic: config.kafka.topic,
      messages: [
        {
          key: log.id,
          value: JSON.stringify({
            level: log.level,
            message: log.message,
            timestamp: log.timestamp,
          }),
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
