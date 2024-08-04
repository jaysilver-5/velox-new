// models/Transaction.js
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  coin_name: { type: String, required: true },
  rate: { type: Number, required: true },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
