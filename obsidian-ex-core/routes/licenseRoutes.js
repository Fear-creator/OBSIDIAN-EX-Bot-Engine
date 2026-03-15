const express = require('express');
const License = require('../database/models/License');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { key, expires, active = true } = req.body;
    const license = await License.create({ key, expires, active });
    res.status(201).json(license);
  } catch (error) {
    next(error);
  }
});

router.get('/verify/:key', async (req, res, next) => {
  try {
    const { key } = req.params;
    const license = await License.findOne({ key, active: true }).lean();
    const valid = Boolean(license && new Date(license.expires) > new Date());

    res.json({ valid, license: valid ? license : null });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
