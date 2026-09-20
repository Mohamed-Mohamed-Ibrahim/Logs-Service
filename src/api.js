const express = require("express");
const morgan = require("morgan");
const { startKafka } = require("./kafka.js");
const loggingRoutes = require("./application/controllers/logging-controller.js");

const app = express();
const port = 3000;

async function init() {
  try {
    await startKafka();
    setTimeout(() => {
      console.log("Kafka producer and consumer connected successfully");
    }, 1000);
  } catch (error) {
    console.error("Failed to connect Kafka producer and consumer:", error);
    process.exit(1);
  }
}
init();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
console.log("Kafka xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx:");
app.use("/logging", loggingRoutes);

app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

module.exports = {
  app,
};
