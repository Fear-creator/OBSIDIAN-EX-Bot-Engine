import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    region: { type: String, default: 'global' },
    status: { type: String, enum: ['running', 'restarting', 'stopped'], default: 'running' },
    startedAt: { type: Date, default: Date.now },
    lastRestartedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model('Session', sessionSchema);
