import mongoose from 'mongoose';

const licenseSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    expires: { type: Date, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('License', licenseSchema);
