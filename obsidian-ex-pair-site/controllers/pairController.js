const axios = require('axios');

const API_BASE_URL = process.env.OBSIDIAN_EX_API_URL || 'http://localhost:4000/api';

const mapBackendError = (error, fallback = 'Could not process request.') => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.code === 'ECONNREFUSED') {
    return 'Cannot reach OBSIDIAN-EX backend. Please verify backend is running.';
  }

  return fallback;
};

exports.renderLanding = (req, res) => {
  res.render('index', {
    pageTitle: 'OBSIDIAN-EX Pairing Portal',
    error: null
  });
};

exports.generatePairCode = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).render('index', {
      pageTitle: 'OBSIDIAN-EX Pairing Portal',
      error: 'Please enter a WhatsApp number.'
    });
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/pair/generate`, {
      phoneNumber
    });

    const { sessionId, pairCode, status } = response.data;

    return res.render('pair', {
      pageTitle: 'Pair Your Session',
      sessionId,
      phoneNumber,
      pairCode,
      status: status || 'PENDING',
      error: null
    });
  } catch (error) {
    return res.status(500).render('index', {
      pageTitle: 'OBSIDIAN-EX Pairing Portal',
      error: mapBackendError(error, 'Failed to generate pairing code.')
    });
  }
};

exports.getPairStatus = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const response = await axios.get(`${API_BASE_URL}/pair/status/${sessionId}`);
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: mapBackendError(error, 'Failed to fetch session status.')
    });
  }
};

exports.getActiveSessions = async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sessions/active`);
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: mapBackendError(error, 'Failed to fetch active sessions.')
    });
  }
};

exports.reconnectSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const response = await axios.post(`${API_BASE_URL}/sessions/${sessionId}/reconnect`);

    return res.render('success', {
      pageTitle: 'Session Reconnect',
      title: 'Reconnect Request Sent',
      message: response.data.message || 'Reconnect flow was started successfully.',
      sessionId
    });
  } catch (error) {
    return res.status(500).render('success', {
      pageTitle: 'Session Reconnect',
      title: 'Reconnect Failed',
      message: mapBackendError(error, 'Could not reconnect session.'),
      sessionId
    });
  }
};
