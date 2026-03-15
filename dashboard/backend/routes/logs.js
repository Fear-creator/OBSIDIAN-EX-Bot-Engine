import { Router } from 'express';
import Log from '../models/Log.js';

const router = Router();

router.get('/', async (_req, res) => {
  const logs = await Log.find().sort({ createdAt: -1 }).limit(250).lean();
  res.json(
    logs.map((log) => ({
      id: log._id,
      userId: log.userId,
      command: log.command,
      result: log.result,
      createdAt: log.createdAt.toISOString(),
    }))
  );
});

export default router;
