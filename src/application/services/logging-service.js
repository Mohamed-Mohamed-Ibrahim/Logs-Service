const producer = require("../../api.js").producer;
const config = require("../../config.js");

async function recordLog(log) {
  await producer.send({
    topic: config.kafka.topic,
    messages: [log],
  });
}

module.exports = {
  recordLog,
};
