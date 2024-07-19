import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  coin_name: { type: String, required: true },
  rate: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
