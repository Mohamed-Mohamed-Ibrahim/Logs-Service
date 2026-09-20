class Log {
  constructor({ level, message, timestamp }) {
    this.level = level;
    this.message = message;
    this.timestamp = timestamp;
  }
}

module.exports = { Log };
