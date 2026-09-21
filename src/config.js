const config = {
  kafka: {
    clusterId: process.env.KAFKA_CLUSTER_ID || "cluster-id",
    broker: process.env.KAFKA_BROKER || "localhost:9092",
    consumerId: process.env.KAFKA_CONSUMER_ID || "consumer-id",
    topic: process.env.KAFKA_TOPIC || "test-topic",
  },
};

module.exports = config;
