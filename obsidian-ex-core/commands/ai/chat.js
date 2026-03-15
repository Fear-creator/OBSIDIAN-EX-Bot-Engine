const { generateChatResponse } = require('../../services/aiService');

module.exports = {
  name: 'ai',
  description: 'Generate AI response. Usage: !ai <prompt>',
  async execute(ctx) {
    const prompt = ctx.args.join(' ').trim();
    if (!prompt) {
      return { text: 'Usage: !ai <prompt>' };
    }

    const output = await generateChatResponse(prompt);
    return { text: output };
  }
};
