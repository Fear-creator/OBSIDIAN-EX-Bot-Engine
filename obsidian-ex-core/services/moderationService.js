const logger = require('../utils/logger');

function buildModerationAction(action, target, reason) {
  const normalizedReason = reason || 'No reason provided';
  const message = `${action.toUpperCase()}: ${target} (${normalizedReason})`;

  logger.info({ action, target, reason: normalizedReason }, 'Moderation action executed');

  return {
    ok: true,
    action,
    target,
    reason: normalizedReason,
    message
  };
}

module.exports = {
  warn: (target, reason) => buildModerationAction('warn', target, reason),
  mute: (target, reason) => buildModerationAction('mute', target, reason),
  ban: (target, reason) => buildModerationAction('ban', target, reason)
};
