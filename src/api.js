const express = require("express");
const morgan = require("morgan");

const { startKafka } = require("./kafka.js");
const { runWorker } = require("./utils.js");
const { connectToDatabase } = require("./mongodb.js");
const loggingRoutes = require("./application/controllers/logging-controller.js");
const filteringRoutes = require("./application/controllers/filtering-controller.js");

const app = express();
const port = 3000;

async function init() {
  try {
    await startKafka();
    await connectToDatabase();
    await runWorker();
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
}
init().then(() => {
  console.log("------------------------------------------------------------");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/logging", loggingRoutes);

app.use("/filtering", filteringRoutes);

app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = {
  app,
};
