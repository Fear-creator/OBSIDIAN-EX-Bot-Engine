import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import licensesRouter from './routes/licenses.js';
import sessionsRouter from './routes/sessions.js';
import logsRouter from './routes/logs.js';
import User from './models/User.js';
import License from './models/License.js';
import Session from './models/Session.js';
import Log from './models/Log.js';

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/obsidian_ex_dashboard';

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/stats', async (_req, res) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [activeUsers, activeLicenses, runningSessions, todayCommands] = await Promise.all([
    User.countDocuments({ banned: false, status: 'active' }),
    License.countDocuments({ active: true, expires: { $gte: new Date() } }),
    Session.countDocuments({ status: 'running' }),
    Log.countDocuments({ createdAt: { $gte: todayStart } }),
  ]);

  return res.json({
    activeUsers,
    activeLicenses,
    runningSessions,
    todayCommands,
    botStatus: 'online',
  });
});

app.use('/api/users', usersRouter);
app.use('/api/licenses', licensesRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/logs', logsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

async function seedData() {
  const userCount = await User.countDocuments();
  if (userCount > 0) return;

  const license = await License.create({ key: 'EX-92X1-AZ', expires: '2026-09-01', active: true });
  const [u1, u2] = await User.create([
    { username: 'aria', email: 'aria@obsidian.dev', licenseKey: license.key, status: 'active' },
    { username: 'vex', email: 'vex@obsidian.dev', licenseKey: license.key, status: 'active' },
  ]);

  await Session.create([
    { userId: u1._id, region: 'us-east', status: 'running' },
    { userId: u2._id, region: 'eu-west', status: 'running' },
  ]);

  await Log.create([
    { userId: u1._id, command: '/scan', result: 'success' },
    { userId: u2._id, command: '/fetch', result: 'success' },
  ]);
}

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    await seedData();
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
