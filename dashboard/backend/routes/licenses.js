import { Router } from 'express';
import License from '../models/License.js';

const router = Router();

router.get('/', async (_req, res) => {
  const licenses = await License.find().sort({ createdAt: -1 }).lean();
  res.json(
    licenses.map((license) => ({
      id: license._id,
      key: license.key,
      expires: license.expires.toISOString().slice(0, 10),
      active: license.active,
    }))
  );
});

router.post('/', async (req, res) => {
  const { key, expires } = req.body;
  if (!key || !expires) {
    return res.status(400).json({ message: 'key and expires are required.' });
  }

  const exists = await License.findOne({ key }).lean();
  if (exists) {
    return res.status(409).json({ message: 'License key already exists.' });
  }

  const license = await License.create({ key, expires, active: true });
  return res.status(201).json({
    id: license._id,
    key: license.key,
    expires: license.expires.toISOString().slice(0, 10),
    active: license.active,
  });
});

router.patch('/:id/disable', async (req, res) => {
  const license = await License.findByIdAndUpdate(req.params.id, { active: false }, { new: true }).lean();
  if (!license) {
    return res.status(404).json({ message: 'License not found.' });
  }
  return res.json({ message: 'License disabled.', id: license._id });
});

export default router;
