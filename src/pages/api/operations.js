// pages/api/operations.js

import dbConnect from '../../../lib/dbConnect';
import Operation from '../../../models/Operation';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const operation = await Operation.findOne();
        if (!operation) {
          return res.status(404).json({ success: false, message: 'Operation not found' });
        }
        res.status(200).json({ success: true, data: operation });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
    case 'POST':
      try {
        const { buyrate, sellrate, maxBuy, minBuy } = req.body;

        // Check if the document exists
        let operation = await Operation.findOne();

        if (operation) {
          // Update existing document
          if (buyrate !== undefined) operation.buyrate = buyrate;
          if (sellrate !== undefined) operation.sellrate = sellrate;
          if (maxBuy !== undefined) operation.maxBuy = maxBuy;
          if (minBuy !== undefined) operation.minBuy = minBuy;

          await operation.save();
          res.status(200).json({ success: true, data: operation });
        } else {
          // Create new document
          operation = new Operation({
            buyrate,
            sellrate,
            maxBuy,
            minBuy,
          });

          await operation.save();
          res.status(201).json({ success: true, data: operation });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
