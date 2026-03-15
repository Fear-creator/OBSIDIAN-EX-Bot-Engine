const mongoose = require('mongoose');
const config = require('../config/config');
const logger = require('../utils/logger');

async function connectDb() {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error({ err: error }, 'MongoDB connection failed');
    throw error;
  }
}

module.exports = connectDb;
