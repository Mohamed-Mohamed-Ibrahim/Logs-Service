const { Kafka, logLevel } = require("kafkajs");
const config = require("./config.js");

const kafka = new Kafka({
  brokers: [config.kafka.broker],
  logLevel: logLevel.ERROR,
});
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: config.kafka.clusterId });
async function startKafka() {
  await producer.connect();
  await consumer.connect();
}

process.on("SIGTERM", async () => {
  await consumer.disconnect();
  await producer.disconnect();
  process.exit(0);
});

module.exports = {
  startKafka,
  producer,
  consumer,
};
