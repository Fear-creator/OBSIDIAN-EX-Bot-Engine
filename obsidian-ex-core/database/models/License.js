const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    expires: {
      type: Date,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('License', licenseSchema);
