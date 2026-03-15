const moderationService = require('../../services/moderationService');

module.exports = {
  name: 'mute',
  description: 'Mute a user. Usage: !mute <target> [reason]',
  async execute(ctx) {
    const [target, ...reasonParts] = ctx.args;
    if (!target) {
      return { text: 'Usage: !mute <target> [reason]' };
    }

    const result = moderationService.mute(target, reasonParts.join(' '));
    return { text: result.message };
  }
};
