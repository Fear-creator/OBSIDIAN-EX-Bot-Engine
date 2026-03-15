const express = require('express');
const pairController = require('../controllers/pairController');

const router = express.Router();

router.get('/', pairController.renderLanding);
router.post('/pair', pairController.generatePairCode);
router.get('/api/pair/status/:sessionId', pairController.getPairStatus);
router.get('/api/sessions/active', pairController.getActiveSessions);
router.post('/sessions/:sessionId/reconnect', pairController.reconnectSession);

module.exports = router;
