const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
  level: {
    type: String,
    required: true,
    index: true,
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

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
