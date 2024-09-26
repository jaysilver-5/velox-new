// models/Operation.js

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
}, {
  timestamps: true,
});

export default mongoose.models.Operation || mongoose.model('Operation', operationSchema);
