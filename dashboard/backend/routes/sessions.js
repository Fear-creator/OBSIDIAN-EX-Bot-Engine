import { Router } from 'express';
import Session from '../models/Session.js';

const router = Router();

router.get('/', async (_req, res) => {
  const sessions = await Session.find().sort({ createdAt: -1 }).lean();
  res.json(
    sessions.map((session) => ({
      id: session._id,
      userId: session.userId,
      region: session.region,
      status: session.status,
      startedAt: session.startedAt.toISOString(),
      lastRestartedAt: session.lastRestartedAt?.toISOString() || null,
    }))
  );
});

router.patch('/:id/restart', async (req, res) => {
  const now = new Date();
  const session = await Session.findByIdAndUpdate(
    req.params.id,
    { status: 'running', lastRestartedAt: now },
    { new: true }
  ).lean();

  if (!session) {
    return res.status(404).json({ message: 'Session not found.' });
  }
  return res.json({ message: 'Session restarted.', id: session._id, restartedAt: now.toISOString() });
});

export default router;
