const mongoose = require("mongoose");
const config = require("./config.js");

const dbURI = config.mongo.url;

async function connectToDatabase() {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = {
  connectToDatabase,
};
