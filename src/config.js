const config = {
  kafka: {
    clusterId: process.env.KAFKA_CLUSTER_ID || "cluster-id",
    broker: process.env.KAFKA_BROKER || "mykafka:9092",
    consumerId: process.env.KAFKA_CONSUMER_ID || "consumer-id",
    topic: process.env.KAFKA_TOPIC || "test-topic",
  },
  mongo:{
    url: process.env.MONGO_URI || "mongodb://mymongodb:27017/",
  }
};

module.exports = config;
