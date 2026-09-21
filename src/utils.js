const { Worker } = require("worker_threads");

function runWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./src/infrastructure/worker/consumer-worker.js");

    worker.on("message", (message) => {
      console.log(`Worker message: ${message}`);
    });

    worker.on("error", (error) => {
      console.error(`Worker error: ${error}`);
      reject(error);
    });
  });
}
module.exports = {
  runWorker,
};
