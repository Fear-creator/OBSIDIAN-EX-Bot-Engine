require('dotenv').config();

module.exports = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/obsidian-ex-core',
  openAiKey: process.env.OPENAI_KEY || '',
  commandPrefix: '!',
  rateLimit: {
    windowMs: 10_000,
    maxCommands: 5
  }
};
