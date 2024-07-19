import mongoose from 'mongoose';

const ReferralActivitySchema = new mongoose.Schema({
  amount_sold: { type: Number, required: true },
  amount_bought: { type: Number, required: true },
  total_amount: { type: Number, required: true },
  commission: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.models.ReferralActivity || mongoose.model('ReferralActivity', ReferralActivitySchema);
