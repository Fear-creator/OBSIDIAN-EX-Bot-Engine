const mongoose = require('mongoose');

const commandLogSchema = new mongoose.Schema(
  {
    command: {
      type: String,
      required: true,
      index: true
    },
    user: {
      type: String,
      required: true,
      index: true
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('CommandLog', commandLogSchema);
