


import producer from '../../api.js';


async function recordLog(log) {
  await producer.send({
    topic: EXAMPLE_TOPIC,
    messages: [log],
  })
}

module.exports = {
  recordLog
}