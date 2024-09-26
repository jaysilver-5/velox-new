// models/Transaction.js
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  amount_dollar: { type: Number, required: true },
  amount_naira: { type: Number, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  coin_name: { type: String, required: true },
  rate: { type: Number, required: true },
  bankname: { type: String, required: false },
  accountNumber: { type: String, required: false },
  note: { type: String, required: false },
  network: { type: String, required: true },
  walletAddress: { type: String, required: false },
  proof: {
    type: Buffer, // Stores binary data, suitable for images or PDFs
    contentType: { type: String, required: false }, // Specifies the MIME type (e.g., 'image/png', 'application/pdf')
  },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
