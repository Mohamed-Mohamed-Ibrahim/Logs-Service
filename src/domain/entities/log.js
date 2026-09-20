const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
  level: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

class LogClass {
  constructor({ level, message, timestamp }) {
    this.level = level;
    this.message = message;
    this.timestamp = timestamp;
  }
}

logSchema.loadClass(LogClass);

const Log = mongoose.model("Log", logSchema);

module.exports = { Log };
