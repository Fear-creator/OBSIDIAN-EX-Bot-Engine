const License = require('../database/models/License');
const User = require('../database/models/User');

async function licenseCheck(req, res, next) {
  try {
    const phone = req.body?.phone;

    if (!phone) {
      return res.status(400).json({ error: 'Phone is required for license verification.' });
    }

    const user = await User.findOne({ phone }).lean();
    if (!user) {
      return res.status(403).json({ error: 'User does not have an assigned license.' });
    }

    const license = await License.findOne({ key: user.licenseKey, active: true }).lean();
    const now = new Date();

    if (!license || new Date(license.expires) <= now) {
      return res.status(403).json({ error: 'License is invalid or expired.' });
    }

    req.user = user;
    req.license = license;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = licenseCheck;
