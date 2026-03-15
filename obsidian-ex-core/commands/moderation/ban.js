const moderationService = require('../../services/moderationService');

module.exports = {
  name: 'ban',
  description: 'Ban a user. Usage: !ban <target> [reason]',
  async execute(ctx) {
    const [target, ...reasonParts] = ctx.args;
    if (!target) {
      return { text: 'Usage: !ban <target> [reason]' };
    }

    const result = moderationService.ban(target, reasonParts.join(' '));
    return { text: result.message };
  }
};
