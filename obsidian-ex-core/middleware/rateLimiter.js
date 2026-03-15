const config = require('../config/config');

const buckets = new Map();

function rateLimiter(req, res, next) {
  const userId = req.body?.phone || req.body?.user || req.ip || 'anonymous';
  const now = Date.now();

  const bucket = buckets.get(userId) || [];
  const windowStart = now - config.rateLimit.windowMs;
  const recent = bucket.filter((timestamp) => timestamp > windowStart);

  if (recent.length >= config.rateLimit.maxCommands) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Maximum 5 commands per 10 seconds.'
    });
  }

  recent.push(now);
  buckets.set(userId, recent);
  next();
}

module.exports = rateLimiter;
