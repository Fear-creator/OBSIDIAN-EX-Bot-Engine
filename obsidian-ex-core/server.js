const express = require('express');
const pinoHttp = require('pino-http');
const config = require('./config/config');
const logger = require('./utils/logger');
const connectDb = require('./database/db');
const webhookRouter = require('./apps/bot/webhook');
const dashboardRoutes = require('./routes/dashboardRoutes');
const licenseRoutes = require('./routes/licenseRoutes');

const app = express();

app.use(express.json());
app.use(pinoHttp({ logger }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/webhook', webhookRouter);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/licenses', licenseRoutes);

app.use((error, req, res, next) => {
  logger.error({ err: error }, 'Unhandled error');

  const status = error.statusCode || 500;
  res.status(status).json({
    error: error.message || 'Internal server error'
  });
});

async function startServer() {
  await connectDb();
  app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
  });
}

startServer();
