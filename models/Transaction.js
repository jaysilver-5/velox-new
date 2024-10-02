// models/Transaction.js
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true }, // Unique transaction ID
  amount_dollar: { type: Number, required: true },               // Amount in dollars
  amount_naira: { type: Number, required: true },                // Amount in naira
  type: { type: String, required: true },                        // Transaction type (e.g., buy, sell)
  status: { type: String, required: true },                      // Status of transaction (e.g., pending, completed)
  timestamp: { type: Date, default: Date.now },                  // Timestamp of the transaction
  coin_name: { type: String, required: true },                   // Name of the coin being traded
  rate: { type: Number, required: true },                        // Exchange rate of the coin
  bankname: { type: String, required: false },
  transaction_proof: { type: String, required: false },                      // Bank name (for certain transaction types)
  accountNumber: { type: String, required: false },              // Account number (optional)
  // note: { type: String, required: false },                       // Optional note
  network: { type: String, required: true },                     // Blockchain network (e.g., Ethereum, Bitcoin)
  walletAddress: { type: String, required: false },              // Wallet address (optional)
  // proof: { type: String, required: false },                      // Proof (e.g., URL, transaction hash)
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
