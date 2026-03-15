const axios = require('axios');
const config = require('../config/config');

async function generateChatResponse(prompt) {
  if (!config.openAiKey) {
    throw new Error('OPENAI_KEY is not configured');
  }

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a concise assistant for Obsidian EX bot users.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${config.openAiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 15_000
    }
  );

  return response.data?.choices?.[0]?.message?.content?.trim() || 'No response generated.';
}

module.exports = {
  generateChatResponse
};
