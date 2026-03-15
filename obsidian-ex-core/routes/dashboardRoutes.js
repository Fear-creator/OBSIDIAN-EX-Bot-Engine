const express = require('express');
const CommandLog = require('../database/models/CommandLog');
const User = require('../database/models/User');
const License = require('../database/models/License');

const router = express.Router();

router.get('/stats', async (req, res, next) => {
  try {
    const [totalUsers, activeLicenses, recentCommands] = await Promise.all([
      User.countDocuments(),
      License.countDocuments({ active: true, expires: { $gt: new Date() } }),
      CommandLog.find().sort({ timestamp: -1 }).limit(20).lean()
    ]);

    res.json({
      totalUsers,
      activeLicenses,
      recentCommands
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
