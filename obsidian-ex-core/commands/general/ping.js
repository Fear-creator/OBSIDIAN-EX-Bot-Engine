module.exports = {
  name: 'ping',
  description: 'Check bot latency and health.',
  async execute(ctx) {
    return {
      text: 'Pong! Obsidian EX core is online.'
    };
  }
};
