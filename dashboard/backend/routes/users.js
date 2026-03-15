import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).lean();
  res.json(
    users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      licenseKey: user.licenseKey,
      status: user.status,
      banned: user.banned,
    }))
  );
});

router.patch('/:id/ban', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { banned: true, status: 'inactive' }, { new: true }).lean();
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  return res.json({ message: 'User banned.', id: user._id });
});

export default router;
