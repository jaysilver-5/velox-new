// /models/Operation.js

import mongoose from 'mongoose';

const operationSchema = new mongoose.Schema({
  buyrate: {
    type: Number,
    required: true,
  },
  sellrate: {
    type: Number,
    required: true,
  },
  maxBuy: {
    type: Number,
    required: true,
  },
  minBuy: {
    type: Number,
    required: true,
  },
  payment_bank: {
    type: String,
  },
  payment_account: {
    type: String,
  },
  payment_address: {
    type: Map, // Store network-address pairs
    of: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Operation || mongoose.model('Operation', operationSchema);
