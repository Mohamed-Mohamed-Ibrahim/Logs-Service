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

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = {
  runWorker,
  paginatedResults
};
