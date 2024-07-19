import mongoose from 'mongoose';

const RateNairaSchema = new mongoose.Schema({
  value: { type: Number, required: true },
});

export default mongoose.models.RateNaira || mongoose.model('RateNaira', RateNairaSchema);
