const express = require('express');
const { botRouter } = require('./router');
const rateLimiter = require('../../middleware/rateLimiter');
const licenseCheck = require('../../middleware/licenseCheck');

const webhookRouter = express.Router();

webhookRouter.post('/message', rateLimiter, licenseCheck, async (req, res, next) => {
  try {
    const result = await botRouter(req.body);
    res.json({ ok: true, response: result.text, data: result });
  } catch (error) {
    next(error);
  }
});

module.exports = webhookRouter;
