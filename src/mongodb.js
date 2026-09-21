const mongoose = require("mongoose");

const dbURI = "mongodb://127.0.0.1:27017/";

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
