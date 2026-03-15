import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    command: { type: String, required: true, trim: true },
    result: { type: String, default: 'success' },
  },
  { timestamps: true }
);

export default mongoose.model('Log', logSchema);
