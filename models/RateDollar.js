import mongoose from 'mongoose';

const RateDollarSchema = new mongoose.Schema({
  value: { type: Number, required: true },
});

export default mongoose.models.RateDollar || mongoose.model('RateDollar', RateDollarSchema);
