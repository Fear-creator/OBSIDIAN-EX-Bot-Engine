const moderationService = require('../../services/moderationService');

module.exports = {
  name: 'warn',
  description: 'Warn a user. Usage: !warn <target> [reason]',
  async execute(ctx) {
    const [target, ...reasonParts] = ctx.args;
    if (!target) {
      return { text: 'Usage: !warn <target> [reason]' };
    }

    const result = moderationService.warn(target, reasonParts.join(' '));
    return { text: result.message };
  }
};
