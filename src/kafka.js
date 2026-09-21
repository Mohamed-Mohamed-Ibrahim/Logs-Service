const { Kafka, logLevel } = require("kafkajs");
const config = require("./config.js");

const kafka = new Kafka({
  brokers: [config.kafka.broker],
  logLevel: logLevel.ERROR,
});

const admin = kafka.admin();
const producer = kafka.producer();

async function startKafka() {
  await admin.connect();
  await producer.connect();
  await admin.createTopics({
    topics: [
      {
        topic: config.kafka.topic,
      },
    ],
  });
}

process.on("SIGTERM", async () => {
  await producer.disconnect();
  process.exit(0);
});

module.exports = {
  startKafka,
  producer,
};
